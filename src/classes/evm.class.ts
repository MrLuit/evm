const findOpcode = require('../../node_modules/ethereumjs-vm/dist/opcodes.js');
import * as functionHashes from '../../data/functionHashes.json';
import * as eventHashes from '../../data/eventHashes.json';
import allOpcodes from '../utils/opcodes';
import stringifyEvents from '../utils/stringifyEvents';
import stringifyStructs from '../utils/stringifyStructs';
import stringifyMappings from '../utils/stringifyMappings';
import stringifyVariables from '../utils/stringifyVariables';
import stringifyFunctions from '../utils/stringifyFunctions';
import stringifyInstructions from '../utils/stringifyInstructions';
import Opcode from '../interfaces/opcode.interface';
import Stack from './stack.class';
import Memory from '../interfaces/memory.interface';
import Storage from '../interfaces/storage.interface';
/*import Mappings from '../interfaces/mappings.interface';*/
import Jumps from '../interfaces/jumps.interface';

class EVM {
    pc: number;
    stack: Stack;
    memory: Memory;
    opcodes: Opcode[];
    instructions: any;
    storage: Storage;
    jumps: Jumps;
    code: Buffer;
    mappings: any; /*Mappings;*/
    layer: number;
    halted: boolean;
    functions: any;
    variables: any;
    events: any;
    gasUsed: number;

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
        this.halted = false;
        this.functions = {};
        this.variables = {};
        this.events = {};
        this.gasUsed = 0;
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
        clone.storage = this.storage;
        clone.jumps = { ...this.jumps };
        clone.mappings = this.mappings;
        clone.layer = this.layer + 1;
        clone.functions = this.functions;
        clone.variables = this.variables;
        clone.events = this.events;
        clone.gasUsed = this.gasUsed;
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
        this.functions = {};
        this.variables = {};
        this.events = {};
    }

    parse(): any[] {
        if (this.instructions.length === 0) {
            const opcodes = this.getOpcodes();
            for (this.pc; this.pc < opcodes.length && !this.halted; this.pc++) {
                const opcode = opcodes[this.pc];
                this.gasUsed += opcode.fee;
                if (!(opcode.name in allOpcodes)) {
                    throw new Error('Unknown OPCODE: ' + opcode.name);
                } else {
                    (allOpcodes as any)[opcode.name](opcode, this);
                }
            }
        }
        return this.instructions;
    }

    decompile(): string {
        const instructionTree = this.parse();
        const events = stringifyEvents(this.events, this.getEvents());
        const structs = stringifyStructs(this.mappings);
        const mappings = stringifyMappings(this.mappings);
        const variables = stringifyVariables(this.variables);
        const functions = Object.keys(this.functions)
            .map((functionName: string) =>
                stringifyFunctions(functionName, this.functions[functionName])
            )
            .join('');
        const code = stringifyInstructions(instructionTree);
        return events + structs + mappings + variables + functions + code;
    }
}

export default EVM;
