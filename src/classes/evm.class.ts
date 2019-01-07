const findOpcode = require('../../node_modules/ethereumjs-vm/dist/opcodes.js');
import * as functionHashes from '../../data/functionHashes.json';
import * as eventHashes from '../../data/eventHashes.json';
import allOpcodes from '../utils/opcodes';
import stringifyInstructions from '../utils/stringifyInstructions';
import stringifyFunctions from '../utils/stringifyFunctions';
import parseFunctions from '../utils/parseFunctions';
import parseEvents from '../utils/parseEvents';
import parseMappings from '../utils/parseMappings';
import parseVariables from '../utils/parseVariables';
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
    //instructions: Instruction[];
    instructions: any;
    storage: Storage;
    jumps: Jumps;
    code: Buffer;
    mappings: Mappings;
    layer: number;
    halted: boolean;
    functions: any;

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
        //clone.storage = { ...this.storage };
        clone.storage = this.storage;
        clone.jumps = { ...this.jumps };
        clone.mappings = this.mappings;
        clone.layer = this.layer + 1;
        clone.functions = this.functions;
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

    getABI(json?: boolean): object | string {
        const instructions = this.parse();
        const functions = parseFunctions(stringifyInstructions(instructions), true);
        const ABIFunctions: any = this.getFunctions().map(item => {
            const outputs: any = [];
            const functionData = Object.keys(functions)
                .map(key => functions[key])
                .find((func: any) => func.function === item);
            let constant = false;
            let payable = false;
            if (functionData) {
                payable = functionData.payable;
                if (
                    functionData.lines.length === 1 &&
                    functionData.lines[0].trim().startsWith('return')
                ) {
                    const line = functionData.lines[0]
                        .trim()
                        .substring(6)
                        .slice(0, -1)
                        .trim();
                    if (
                        line.split('"').length === 3 &&
                        line.startsWith('"') &&
                        line.endsWith('"')
                    ) {
                        outputs.push({ name: '_string', type: 'string' });
                    } else if (!isNaN(parseInt(line, 10))) {
                        outputs.push({ name: '_uint256', type: 'uint256' });
                    }
                    constant = true;
                }
            }
            const argumentCounter: any = {};
            const name = item.split('(')[0];
            const inputs = item
                .split('(')[1]
                .split(')')[0]
                .split(',')
                .filter(a => a !== '')
                .map(argument => {
                    let argumentName = '_' + argument;
                    if (!(argument in argumentCounter)) {
                        argumentCounter[argument] = 0;
                    } else {
                        argumentCounter[argument]++;
                        argumentName += argumentCounter[argument];
                    }
                    return {
                        name: argumentName,
                        type: argument
                    };
                });
            return {
                constant,
                name,
                inputs,
                outputs,
                payable,
                type: 'function'
            };
        });
        if ('()' in functions) {
            ABIFunctions.push({
                payable: functions['()'].payable,
                type: 'fallback'
            });
        }
        const ABIEvents = this.getEvents().map(item => {
            const argumentCounter: any = {};
            const name = item.split('(')[0];
            const inputs = item
                .split('(')[1]
                .split(')')[0]
                .split(',')
                .filter(a => a !== '')
                .map(argument => {
                    let argumentName = '_' + argument;
                    if (!(argument in argumentCounter)) {
                        argumentCounter[argument] = 0;
                    } else {
                        argumentCounter[argument]++;
                        argumentName += argumentCounter[argument];
                    }
                    return {
                        name: argumentName,
                        type: argument
                    };
                });
            return {
                name,
                inputs,
                type: 'event'
            };
        });

        const ABI = [...ABIFunctions, ...ABIEvents];
        if (!json) {
            return ABI;
        } else {
            return JSON.stringify(ABI);
        }
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

    parse(): Instruction[] {
        if (this.instructions.length === 0) {
            const opcodes = this.getOpcodes();
            for (this.pc; this.pc < opcodes.length && !this.halted; this.pc++) {
                const opcode = opcodes[this.pc];
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
        const events = parseEvents(this.getEvents());
        const variables = parseVariables(this.storage, this.functions, instructionTree);
        const functions = Object.keys(this.functions)
            .map((functionName: string) =>
                stringifyFunctions(functionName, this.functions[functionName])
            )
            .join('');
        const code = stringifyInstructions(instructionTree);
        return events + variables + functions + code;
    }
}

export default EVM;
