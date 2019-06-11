import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import Instruction from '../classes/instruction.class';

export class NUMBER {
    readonly type: string;
    readonly static: boolean;

    constructor() {
        this.type = 'NUMBER';
        this.static = true;
    }

    toString() {
        return 'block.number';
    }
}

export default (opcode: Opcode, state: EVM): Instruction => {
    const instruction = new Instruction(opcode.name, opcode.pc);
    state.stack.push(new NUMBER());
    return instruction;
};
