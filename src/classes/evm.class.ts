const findOpcode = require('../../node_modules/ethereumjs-vm/dist/opcodes.js');
import * as functionHashes from '../../data/functionHashes.json';
import allOpcodes from '../utils/opcodes';
import stringifyInstructions from '../utils/stringifyInstructions';
import parseFunctions from '../utils/parseFunctions';

class EVM {
    pc: number;
    instructions: object[];
    stack: string[];
    memory: object;
    storage: object;
    jumps: object;
    code: Buffer;

    constructor(code: string | Buffer, pc = 0, stack = [], memory = {}, jumps = {}) {
        this.pc = pc;
        this.instructions = [];
        this.stack = stack;
        this.memory = memory;
        this.storage = {};
        this.jumps = jumps;
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
        return this.getOpcodes()
            .filter(opcode => opcode.name === 'PUSH4')
            .map(opcode => opcode.pushData.toString('hex'))
            .filter(hash => hash in functionHashes)
            .map(hash => (functionHashes as any)[hash]);
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
        return parseFunctions(stringifyInstructions(this.instructions, debug));
    }
}

export default EVM;
