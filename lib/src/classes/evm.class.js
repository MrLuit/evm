"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functionHashes = require("../../data/functionHashes.json");
const eventHashes = require("../../data/eventHashes.json");
const opcodes_1 = require("../utils/opcodes");
const stringifyEvents_1 = require("../utils/stringifyEvents");
const stringifyStructs_1 = require("../utils/stringifyStructs");
const stringifyMappings_1 = require("../utils/stringifyMappings");
const stringifyVariables_1 = require("../utils/stringifyVariables");
const stringifyFunctions_1 = require("../utils/stringifyFunctions");
const stringifyInstructions_1 = require("../utils/stringifyInstructions");
const stack_class_1 = require("./stack.class");
const opcodes_2 = require("../opcodes");
class EVM {
    constructor(code) {
        this.pc = 0;
        this.stack = new stack_class_1.default();
        this.memory = {};
        this.opcodes = [];
        this.instructions = [];
        this.storage = {};
        this.jumps = {};
        this.mappings = {};
        this.layer = 0;
        this.halted = false;
        this.functions = {};
        this.variables = {};
        this.events = {};
        this.gasUsed = 0;
        this.conditions = [];
        if (code instanceof Buffer) {
            this.code = code;
        }
        else {
            this.code = Buffer.from(code.replace('0x', ''), 'hex');
        }
    }
    clone() {
        const clone = new EVM(this.code);
        clone.pc = this.pc;
        clone.opcodes = this.opcodes;
        clone.stack = this.stack.clone();
        clone.memory = Object.assign({}, this.memory);
        clone.storage = this.storage;
        clone.jumps = Object.assign({}, this.jumps);
        clone.mappings = this.mappings;
        clone.layer = this.layer + 1;
        clone.functions = this.functions;
        clone.variables = this.variables;
        clone.events = this.events;
        clone.gasUsed = this.gasUsed;
        clone.conditions = [...this.conditions];
        return clone;
    }
    getBytecode() {
        return '0x' + this.code.toString('hex');
    }
    getOpcodes() {
        if (this.opcodes.length === 0) {
            for (let index = 0; index < this.code.length; index++) {
                const currentOp = {
                    pc: index,
                    opcode: this.code[index],
                    name: 'INVALID'
                };
                if (currentOp.opcode in opcodes_2.codes) {
                    currentOp.name = opcodes_2.codes[this.code[index]];
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
    getFunctions() {
        return [
            ...new Set(this.getOpcodes()
                .filter(opcode => opcode.name === 'PUSH4')
                .map(opcode => (opcode.pushData ? opcode.pushData.toString('hex') : ''))
                .filter(hash => hash in functionHashes)
                .map(hash => functionHashes[hash]))
        ];
    }
    getEvents() {
        return [
            ...new Set(this.getOpcodes()
                .filter(opcode => opcode.name === 'PUSH32')
                .map(opcode => (opcode.pushData ? opcode.pushData.toString('hex') : ''))
                .filter(hash => hash in eventHashes)
                .map(hash => eventHashes[hash]))
        ];
    }
    containsOpcode(opcode) {
        let halted = false;
        if (typeof opcode === 'string' && opcode in opcodes_2.names) {
            opcode = opcodes_2.names[opcode];
        }
        else if (typeof opcode === 'string') {
            throw new Error('Invalid opcode provided');
        }
        for (let index = 0; index < this.code.length; index++) {
            const currentOpcode = this.code[index];
            if (currentOpcode === opcode && !halted) {
                return true;
            }
            else if (currentOpcode === opcodes_2.JUMPDEST) {
                halted = false;
            }
            else if ([opcodes_2.STOP, opcodes_2.RETURN, opcodes_2.REVERT, opcodes_2.INVALID, opcodes_2.SELFDESTRUCT].includes(currentOpcode)) {
                halted = true;
            }
            else if (currentOpcode >= opcodes_2.PUSH1 && currentOpcode <= opcodes_2.PUSH32) {
                index += currentOpcode - opcodes_2.PUSH1 + 0x01;
            }
        }
        return false;
    }
    getJumpDestinations() {
        return this.getOpcodes()
            .filter(opcode => opcode.name === 'JUMPDEST')
            .map(opcode => opcode.pc);
    }
    getSwarmHash() {
        const regex = /a165627a7a72305820([a-f0-9]{64})0029$/;
        const bytecode = this.getBytecode();
        const match = bytecode.match(regex);
        if (match && match[1]) {
            return 'bzzr://' + match[1];
        }
        else {
            return false;
        }
    }
    getABI() {
        const abi = [];
        if (this.instructions.length === 0) {
            this.parse();
        }
        const nameAndParamsRegex = /(.*)\((.*)\)/;
        Object.keys(this.functions).forEach((key) => {
            const matches = nameAndParamsRegex.exec(this.functions[key].label);
            if (matches !== null && matches[1] && matches[2]) {
                const item = {
                    constant: this.functions[key].constant,
                    name: matches[1],
                    inputs: matches[2] !== ''
                        ? matches[2].split(',').map((input) => {
                            return {
                                name: '',
                                type: input
                            };
                        })
                        : [],
                    outputs: this.functions[key].returns.map((output) => {
                        return {
                            name: '',
                            type: output
                        };
                    }) || [],
                    type: 'function'
                };
                abi.push(item);
            }
        });
        Object.keys(this.events).forEach((key) => {
            const matches = nameAndParamsRegex.exec(this.events[key].label);
            if (matches !== null && matches[1] && matches[2]) {
                const item = {
                    anonymous: false,
                    inputs: matches[2] !== ''
                        ? matches[2].split(',').map((input, index) => {
                            return {
                                indexed: index < this.events[key].indexedCount ? true : false,
                                name: '',
                                type: input
                            };
                        })
                        : [],
                    name: matches[1],
                    type: 'event'
                };
                abi.push(item);
            }
        });
        return abi;
    }
    reset() {
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
    parse() {
        if (this.instructions.length === 0) {
            const opcodes = this.getOpcodes();
            for (this.pc; this.pc < opcodes.length && !this.halted; this.pc++) {
                const opcode = opcodes[this.pc];
                if (!(opcode.name in opcodes_1.default)) {
                    throw new Error('Unknown OPCODE: ' + opcode.name);
                }
                else {
                    opcodes_1.default[opcode.name](opcode, this);
                }
            }
        }
        return this.instructions;
    }
    decompile() {
        const instructionTree = this.parse();
        const events = stringifyEvents_1.default(this.events, this.getEvents());
        const structs = stringifyStructs_1.default(this.mappings);
        const mappings = stringifyMappings_1.default(this.mappings);
        const variables = stringifyVariables_1.default(this.variables);
        const functions = Object.keys(this.functions)
            .map((functionName) => stringifyFunctions_1.default(functionName, this.functions[functionName]))
            .join('');
        const code = stringifyInstructions_1.default(instructionTree);
        return events + structs + mappings + variables + functions + code;
    }
    isERC165() {
        return ['supportsInterface(bytes4)'].every(v => this.getFunctions().includes(v));
    }
}
exports.default = EVM;
//# sourceMappingURL=evm.class.js.map