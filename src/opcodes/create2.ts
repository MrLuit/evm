import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import Instruction from '../classes/instruction.class';
import stringify from '../utils/stringify';

export class CREATE2 {
    readonly type: string;
    readonly static: boolean;
    readonly memoryStart: any;
    readonly memoryLength: any;
    readonly value: any;

    constructor(memoryStart: any, memoryLength: any, value: any) {
        this.type = 'CREATE2';
        this.static = false;
        this.memoryStart = memoryStart;
        this.memoryLength = memoryLength;
        this.value = value;
    }

    toString() {
        return (
            '(new Contract(memory[' +
            stringify(this.memoryStart) +
            ':(' +
            stringify(this.memoryStart) +
            '+' +
            stringify(this.memoryLength) +
            ')]).value(' +
            stringify(this.value) +
            ')).address'
        );
    }
}

export default (opcode: Opcode, state: EVM): Instruction => {
    const value = state.stack.pop();
    const memoryStart = state.stack.pop();
    const memoryLength = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    state.stack.push(new CREATE2(memoryStart, memoryLength, value));
    return instruction;
};
