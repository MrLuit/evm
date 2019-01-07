import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import Instruction from '../classes/instruction.class';

export class INVALID {
    readonly type: string;
    readonly static: boolean;

    constructor() {
        this.type = 'INVALID';
        this.static = false;
    }

    toString() {
        return 'INVALID';
    }
}

export default (opcode: Opcode, state: EVM): Instruction => {
    const instruction = new Instruction(opcode.name, opcode.pc);
    state.halted = true;
    instruction.halt();
    state.instructions.push(new INVALID());
    return instruction;
};
