import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import Instruction from '../classes/instruction.class';

export class DIFFICULTY {
    readonly type: string;
    readonly static: boolean;

    constructor() {
        this.type = 'DIFFICULTY';
        this.static = true;
    }

    toString() {
        return 'block.difficulty';
    }
}

export default (opcode: Opcode, state: EVM): Instruction => {
    const instruction = new Instruction(opcode.name, opcode.pc);
    state.stack.push(new DIFFICULTY());
    return instruction;
};
