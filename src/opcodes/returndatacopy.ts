import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import Instruction from '../classes/instruction.class';
import stringify from '../utils/stringify';

export class RETURNDATACOPY {
    readonly type: string;
    readonly static: boolean;
    readonly returnDataPosition: any;
    readonly returnDataSize: any;

    constructor(returnDataPosition: any, returnDataSize: any) {
        this.type = 'RETURNDATACOPY';
        this.static = false;
        this.returnDataPosition = returnDataPosition;
        this.returnDataSize = returnDataSize;
    }

    toString() {
        return (
            'output[' +
            stringify(this.returnDataPosition) +
            ':(' +
            stringify(this.returnDataPosition) +
            '+' +
            stringify(this.returnDataSize) +
            ')]'
        );
    }
}

export default (opcode: Opcode, state: EVM): Instruction => {
    const memoryPosition = state.stack.pop();
    const returnDataPosition = state.stack.pop();
    const returnDataSize = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    state.memory[memoryPosition] = new RETURNDATACOPY(returnDataPosition, returnDataSize);
    return instruction;
};
