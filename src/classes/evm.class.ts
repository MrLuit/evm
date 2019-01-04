const findOpcode = require('../../node_modules/ethereumjs-vm/dist/opcodes.js');
import * as functionHashes from '../../data/functionHashes.json';
import * as eventHashes from '../../data/eventHashes.json';
import allOpcodes from '../utils/opcodes';
import stringifyInstructions from '../utils/stringifyInstructions';
import parseFunctions from '../utils/parseFunctions';
import parseEvents from '../utils/parseEvents';
import parseMappings from '../utils/parseMappings';
import Instruction from './instruction.class';
import Opcode from '../interfaces/opcode.interface';
import Stack from './stack.class';
import Memory from '../interfaces/memory.interface';
import Storage from '../interfaces/storage.interface';
import Mappings from '../interfaces/mappings.interface';
import Jumps from '../interfaces/jumps.interface';

class EVM {
    pc: number;
    stack: Stack;
    memory: Memory;
    opcodes: Opcode[];
    instructions: Instruction[];
    storage: Storage;
    jumps: Jumps;
    code: Buffer;
    mappings: Mappings;
    layer: number;

    constructor(code: string | Buffer) {
        this.pc = 0;
        this.opcodes = [];
        this.instructions = [];
        this.stack = new Stack();
        this.memory = {};
        this.storage = {};
        this.jumps = {};
        this.mappings = {};
        this.layer = 0;
        if (code instanceof Buffer) {
            this.code = code;
        } else {
            this.code = Buffer.from(code.replace('0x', ''), 'hex');
        }
    }

    clone(): EVM {
        const clone = new EVM(this.code);
        clone.pc = this.pc;
        clone.opcodes = this.opcodes;
        clone.stack = this.stack.clone();
        clone.memory = { ...this.memory };
        clone.storage = { ...this.storage };
        clone.jumps = { ...this.jumps };
        clone.mappings = this.mappings;
        clone.layer = this.layer + 1;
        return clone;
    }

    getBytecode(): string {
        return '0x' + this.code.toString('hex');
    }

    getOpcodes(): Opcode[] {
        if (this.opcodes.length === 0) {
            for (let index = 0; index < this.code.length; index++) {
                const currentOp = findOpcode(this.code[index], true);
                currentOp.pc = index;
                this.opcodes.push(currentOp);
                if (currentOp.name.startsWith('PUSH')) {
                    const pushDataLength = this.code[index] - 0x5f;
                    const pushData = this.code.slice(index + 1, index + pushDataLength + 1);
                    currentOp.pushData = pushData;
                    index += pushDataLength;
                }
            }
        }
        return this.opcodes;
    }

    getFunctions(): string[] {
        return [
            ...new Set(
                this.getOpcodes()
                    .filter(opcode => opcode.name === 'PUSH4')
                    .map(opcode => (opcode.pushData ? opcode.pushData.toString('hex') : ''))
                    .filter(hash => hash in functionHashes)
                    .map(hash => (functionHashes as any)[hash])
            )
        ];
    }

    getEvents(): string[] {
        return [
            ...new Set(
                this.getOpcodes()
                    .filter(opcode => opcode.name === 'PUSH32')
                    .map(opcode => (opcode.pushData ? opcode.pushData.toString('hex') : ''))
                    .filter(hash => hash in eventHashes)
                    .map(hash => (eventHashes as any)[hash])
            )
        ];
    }

    getJumpDestinations(): number[] {
        return this.getOpcodes()
            .filter(opcode => opcode.name === 'JUMPDEST')
            .map(opcode => opcode.pc);
    }

    getTotalGas(): number {
        return this.getOpcodes()
            .map(opcode => opcode.fee)
            .reduce((a: number, b: number) => a + b);
    }

    getSwarmHash(): string | boolean {
        const regex = /a165627a7a72305820([a-f0-9]{64})0029$/;
        const bytecode = this.getBytecode();
        const match = bytecode.match(regex);
        if (match && match[1]) {
            return 'bzzr://' + match[1];
        } else {
            return false;
        }
    }

    reset(): void {
        this.pc = 0;
        this.instructions = [];
        this.stack.reset();
        this.memory = {};
        this.storage = {};
        this.jumps = {};
        this.mappings = {};
    }

    run(): Instruction[] {
        if (this.instructions.length === 0) {
            const opCodes = this.getOpcodes();
            for (this.pc; this.pc < opCodes.length; this.pc++) {
                const opCode = opCodes[this.pc];
                if (!(opCode.name in allOpcodes)) {
                    throw new Error('Unknown OPCODE: ' + opCode.name);
                } else {
                    const result = (allOpcodes as any)[opCode.name](opCode, this);
                    this.instructions.push(result);
                    if (!result) {
                        throw new Error('No result? ' + opCode);
                    } else if (result.halted) {
                        break;
                    }
                }
            }
        }
        return this.instructions;
    }

    decompile(debug = false): string {
        const instructions = this.run();
        const events = parseEvents(this.getEvents());
        const decompiledCode = parseMappings(
            parseFunctions(stringifyInstructions(instructions, debug)),
            this.mappings
        );
        if (events) {
            return events + '\n\n' + decompiledCode;
        } else {
            return decompiledCode;
        }
    }
}

export default EVM;
