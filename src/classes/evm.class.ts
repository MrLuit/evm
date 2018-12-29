const findOpcode = require('../../node_modules/ethereumjs-vm/dist/opcodes.js');
import parseFunction from '../utils/functions';
import allOpcodes from '../utils/opcodes';

function stringifyInstructions(depthInstructions: any, debug = false, indentation = 0) {
    let instructionLines = '';
    depthInstructions.forEach((instruction: any) => {
        if (
            instruction.jump &&
            instruction.jump.false.filter((i: any) => i.debugLevel > 0).length === 1 &&
            instruction.jump.false.filter((i: any) => i.debugLevel > 0)[0].description ===
                'revert();' &&
            !instruction.jump.condition.includes('msg.sig')
        ) {
            instructionLines +=
                ' '.repeat(indentation) + 'require' + instruction.jump.condition + ';\n';
            instructionLines += stringifyInstructions(instruction.jump.true, debug, indentation);
        } else if (
            instruction.jump &&
            instruction.jump.false.filter((i: any) => i.debugLevel > 0).length === 1 &&
            instruction.jump.false.filter((i: any) => i.debugLevel > 0)[0].jump
        ) {
            instructionLines +=
                ' '.repeat(indentation) + 'if' + instruction.jump.condition + ' {\n';
            instructionLines += stringifyInstructions(
                instruction.jump.true,
                debug,
                indentation + 4
            );
            instructionLines += ' '.repeat(indentation) + '} else ';
            const elseOrElseIf = stringifyInstructions(instruction.jump.false, debug, indentation);
            if (elseOrElseIf.trim().startsWith('if')) {
                instructionLines += elseOrElseIf.trim() + '\n';
            } else {
                instructionLines +=
                    '{\n' +
                    elseOrElseIf
                        .split('\n')
                        .filter(l => l)
                        .map(l => ' '.repeat(4) + l)
                        .join('\n');
                instructionLines += '\n' + ' '.repeat(indentation) + '}\n';
            }
        } else if (instruction.jump) {
            instructionLines +=
                ' '.repeat(indentation) + 'if' + instruction.jump.condition + ' {\n';
            instructionLines += stringifyInstructions(
                instruction.jump.true,
                debug,
                indentation + 4
            );
            instructionLines += ' '.repeat(indentation) + '} else {\n';
            instructionLines += stringifyInstructions(
                instruction.jump.false,
                debug,
                indentation + 4
            );
            instructionLines += ' '.repeat(indentation) + '}\n';
        } else if (debug || instruction.debugLevel > 0) {
            instructionLines += ' '.repeat(indentation) + instruction.description + '\n';
        }
    });
    return instructionLines;
}

function parseFunctions(stringifiedInstructions: any) {
    return stringifiedInstructions
        .split('\n')
        .map((line: any) => {
            if (!line.startsWith(' ') && line.includes('msg.sig')) {
                let functionHash = line
                    .split(' == ')
                    .find((piece: any) => !piece.includes('msg.sig'));
                if (functionHash.includes('(')) {
                    functionHash = functionHash.split('(')[1];
                } else if (functionHash.includes(')')) {
                    functionHash = functionHash.split(')')[0];
                }
                return '}\n\nfunction ' + parseFunction(functionHash) + ' {';
            } else {
                return line;
            }
        })
        .join('\n');
}

class EVM {
    pc: any;
    pseudoInstructions: any;
    pseudoCode: any;
    stack: any;
    memory: any;
    storage: any;
    jumps: any;
    code: any;

    constructor(code: any, pc = 0, stack = [], memory = {}, jumps = {}) {
        this.pc = pc;
        this.pseudoInstructions = [];
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

    clean() {
        this.pc = 0;
        this.pseudoCode = '';
        this.stack = [];
        this.memory = {};
    }

    run() {
        const opCodes = this.getOpcodes();
        for (this.pc; this.pc < opCodes.length; this.pc++) {
            const opCode = opCodes[this.pc];
            if (!(opCode.name in allOpcodes)) {
                throw new Error('Unknown OPCODE: ' + opCode.name);
            } else {
                const result = (allOpcodes as any)[opCode.name](opCode, this);
                this.pseudoInstructions.push(result);
                if (!result) {
                    throw new Error('No result? ' + opCode);
                } else if (result.halted) {
                    break;
                }
            }
        }
        return this.pseudoInstructions;
    }

    toString(debug = false) {
        let pseudoInstructions = this.pseudoInstructions;
        if (pseudoInstructions.length === 0) {
            this.run();
            pseudoInstructions = this.pseudoInstructions;
        }
        return stringifyInstructions(pseudoInstructions, debug);
    }
}

export default EVM;
