import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import Instruction from '../classes/instruction.class';

export class CALLER {
    readonly type: string;
    readonly static: boolean;

    constructor() {
        this.type = 'CALLER';
        this.static = true;
    }

    toString() {
        return 'msg.sender';
    }
}

export default (opcode: Opcode, state: EVM): Instruction => {
    const instruction = new Instruction(opcode.name, opcode.pc);
    state.stack.push(new CALLER());
    return instruction;
};
