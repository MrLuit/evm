const findOpcode = require('../../node_modules/ethereumjs-vm/dist/opcodes.js');
import * as functionHashes from '../../data/functionHashes.json';
import * as eventHashes from '../../data/eventHashes.json';
import allOpcodes from '../utils/opcodes';
import stringifyInstructions from '../utils/stringifyInstructions';
import parseFunctions from '../utils/parseFunctions';
import parseEvents from '../utils/parseEvents';
import parseMappings from '../utils/parseMappings';

class EVM {
    private pc: number;
    private opcodes: any[];
    private instructions: any[];
    private stack: string[];
    private memory: object;
    private storage: object;
    private jumps: object;
    private code: Buffer;
    private mappings: any;
    private layer: number;

    constructor(code: string | Buffer) {
        this.pc = 0;
        this.opcodes = [];
        this.instructions = [];
        this.stack = [];
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

    clone() {
        const clone = new EVM(this.code);
        clone.pc = this.pc;
        clone.opcodes = this.opcodes;
        clone.stack = [...this.stack];
        clone.memory = { ...this.memory };
        clone.storage = { ...this.storage };
        clone.jumps = { ...this.jumps };
        clone.mappings = this.mappings;
        clone.layer = this.layer + 1;
        return clone;
    }

    getBytecode() {
        return '0x' + this.code.toString('hex');
    }

    getOpcodes() {
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

    getFunctions() {
        return [
            ...new Set(
                this.getOpcodes()
                    .filter(opcode => opcode.name === 'PUSH4')
                    .map(opcode => opcode.pushData.toString('hex'))
                    .filter(hash => hash in functionHashes)
                    .map(hash => (functionHashes as any)[hash])
            )
        ];
    }

    getEvents() {
        return [
            ...new Set(
                this.getOpcodes()
                    .filter(opcode => opcode.name === 'PUSH32')
                    .map(opcode => opcode.pushData.toString('hex'))
                    .filter(hash => hash in eventHashes)
                    .map(hash => (eventHashes as any)[hash])
            )
        ];
    }

    getJumpDestinations() {
        return this.getOpcodes()
            .filter(opcode => opcode.name === 'JUMPDEST')
            .map(opcode => opcode.pc);
    }

    getTotalGas() {
        return this.getOpcodes()
            .map(opcode => opcode.fee)
            .reduce((a: number, b: number) => a + b);
    }

    getSwarmHash() {
        const regex = /a165627a7a72305820([a-f0-9]{64})0029$/;
        const bytecode = this.getBytecode();
        const match = bytecode.match(regex);
        if (match && match[1]) {
            return 'bzzr://' + match[1];
        } else {
            return false;
        }
    }

    reset() {
        this.pc = 0;
        this.instructions = [];
        this.stack = [];
        this.memory = {};
        this.storage = {};
        this.jumps = {};
        this.mappings = {};
    }

    run() {
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

    decompile(debug = false) {
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

export { functionHashes, eventHashes };

export default EVM;
