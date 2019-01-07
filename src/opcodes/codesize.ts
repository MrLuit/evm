import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import Instruction from '../classes/instruction.class';

export class CODESIZE {
    readonly type: string;
    readonly static: boolean;

    constructor() {
        this.type = 'CODESIZE';
        this.static = true;
    }

    toString() {
        return 'this.code.length';
    }
}

export default (opcode: Opcode, state: EVM): Instruction => {
    const instruction = new Instruction(opcode.name, opcode.pc);
    state.stack.push(new CODESIZE());
    return instruction;
};
