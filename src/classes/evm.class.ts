import * as functionHashes from '../../data/functionHashes.json';
import * as eventHashes from '../../data/eventHashes.json';
import opcodeFunctions from '../utils/opcodes';
import stringifyEvents from '../utils/stringifyEvents';
import stringifyStructs from '../utils/stringifyStructs';
import stringifyMappings from '../utils/stringifyMappings';
import stringifyVariables from '../utils/stringifyVariables';
import stringifyFunctions from '../utils/stringifyFunctions';
import stringifyInstructions from '../utils/stringifyInstructions';
import Stack from './stack.class';
import Event from '../interfaces/event.interface';
import Instruction from '../interfaces/instruction.interface';
import Mapping from '../interfaces/mapping.interface';
import Opcode from '../interfaces/opcode.interface';
import Variable from '../interfaces/variable.interface';
import {
    STOP,
    RETURN,
    REVERT,
    INVALID,
    PUSH1,
    PUSH32,
    JUMPDEST,
    SELFDESTRUCT,
    codes,
    names
} from '../opcodes';

export default class EVM {
    pc: number = 0;
    stack: Stack = new Stack();
    memory: any = {};
    opcodes: Opcode[] = [];
    instructions: Instruction[] = [];
    storage: any = {};
    jumps: any = {};
    code: Buffer;
    mappings: Mapping = {};
    layer: number = 0;
    halted: boolean = false;
    functions: any = {};
    variables: Variable = {};
    events: Event = {};
    gasUsed: number = 0;
    conditions: any = [];

    constructor(code: string | Buffer) {
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
        clone.conditions = [...this.conditions];
        return clone;
    }

    getBytecode(): string {
        return '0x' + this.code.toString('hex');
    }

    getOpcodes(): Opcode[] {
        if (this.opcodes.length === 0) {
            for (let index = 0; index < this.code.length; index++) {
                const currentOp: Opcode = {
                    pc: index,
                    opcode: this.code[index],
                    name: 'INVALID'
                };
                if (currentOp.opcode in codes) {
                    currentOp.name = (codes as any)[this.code[index]];
                }
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

    containsOpcode(opcode: number | string): boolean {
        let halted = false;
        if (typeof opcode === 'string' && opcode in names) {
            opcode = (names as any)[opcode];
        } else if (typeof opcode === 'string') {
            throw new Error('Invalid opcode provided');
        }
        for (let index = 0; index < this.code.length; index++) {
            const currentOpcode = this.code[index];
            if (currentOpcode === opcode && !halted) {
                return true;
            } else if (currentOpcode === JUMPDEST) {
                halted = false;
            } else if ([STOP, RETURN, REVERT, INVALID, SELFDESTRUCT].includes(currentOpcode)) {
                halted = true;
            } else if (currentOpcode >= PUSH1 && currentOpcode <= PUSH32) {
                index += currentOpcode - PUSH1 + 0x01;
            }
        }
        return false;
    }

    getJumpDestinations(): number[] {
        return this.getOpcodes()
            .filter(opcode => opcode.name === 'JUMPDEST')
            .map(opcode => opcode.pc);
    }

    getSwarmHash(): string | false {
        const regex = /a165627a7a72305820([a-f0-9]{64})0029$/;
        const bytecode = this.getBytecode();
        const match = bytecode.match(regex);
        if (match && match[1]) {
            return 'bzzr://' + match[1];
        } else {
            return false;
        }
    }

    getABI(): any {
        const abi: any = [];
        if (this.instructions.length === 0) {
            this.parse();
        }
        Object.keys(this.functions).forEach((key: string) => {
            const item: any = abi.push({ type: 'function' });
            item.name = this.functions[key].label.split('(')[0];
            item.payable = this.functions[key].payable;
            item.constant = this.functions[key].constant;
        });
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
        this.gasUsed = 0;
    }

    parse(): Instruction[] {
        if (this.instructions.length === 0) {
            const opcodes = this.getOpcodes();
            for (this.pc; this.pc < opcodes.length && !this.halted; this.pc++) {
                const opcode = opcodes[this.pc];
                if (!(opcode.name in opcodeFunctions)) {
                    throw new Error('Unknown OPCODE: ' + opcode.name);
                } else {
                    (opcodeFunctions as any)[opcode.name](opcode, this);
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

    isERC165(): boolean {
        return ['supportsInterface(bytes4)'].every(v => this.getFunctions().includes(v));
    }
}
