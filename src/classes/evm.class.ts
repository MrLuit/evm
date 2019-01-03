const findOpcode = require('../../node_modules/ethereumjs-vm/dist/opcodes.js');
import * as functionHashes from '../../data/functionHashes.json';
import * as eventHashes from '../../data/eventHashes.json';
import allOpcodes from '../utils/opcodes';
import stringifyInstructions from '../utils/stringifyInstructions';
import parseFunctions from '../utils/parseFunctions';
import parseEvents from '../utils/parseEvents';
import parseMappings from '../utils/parseMappings';

class EVM {
    pc: number;
    instructions: object[];
    stack: string[];
    memory: object;
    storage: object;
    jumps: object;
    code: Buffer;
    mappings: any;
    layer: number;

    constructor(
        code: string | Buffer,
        pc = 0,
        stack = [],
        memory = {},
        jumps = {},
        mappings = {},
        layer = 0
    ) {
        this.pc = pc;
        this.instructions = [];
        this.stack = stack;
        this.memory = memory;
        this.storage = {};
        this.jumps = jumps;
        this.mappings = mappings;
        this.layer = layer;
        if (code instanceof Buffer) {
            this.code = code;
        } else {
            this.code = Buffer.from(code.replace('0x', ''), 'hex');
        }
    }

    getByteCode() {
        return '0x' + this.code.toString('hex');
    }

    getOpcodes() {
        const ops = [];
        for (let index = 0; index < this.code.length; index++) {
            const currentOp = findOpcode(this.code[index], true);
            currentOp.pc = index;
            ops.push(currentOp);
            if (currentOp.name.startsWith('PUSH')) {
                const pushDataLength = this.code[index] - 0x5f;
                const pushData = this.code.slice(index + 1, index + pushDataLength + 1);
                currentOp.pushData = pushData;
                index += pushDataLength;
            }
        }
        return ops;
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

    clean() {
        this.pc = 0;
        this.instructions = [];
        this.stack = [];
        this.memory = {};
        this.storage = {};
        this.jumps = {};
    }

    run() {
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
        return this.instructions;
    }

    decompile(debug = false) {
        if (this.instructions.length === 0) {
            this.run();
        }
        const events = parseEvents(this.getEvents());
        const decompiledCode = parseMappings(
            parseFunctions(stringifyInstructions(this.instructions, debug)),
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
