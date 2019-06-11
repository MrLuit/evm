import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import Instruction from '../classes/instruction.class';

export class STOP {
    readonly type: string;
    readonly static: boolean;

    constructor() {
        this.type = 'STOP';
        this.static = true;
    }

    toString() {
        return 'return;';
    }
}

export default (opcode: Opcode, state: EVM): Instruction => {
    const instruction = new Instruction(opcode.name, opcode.pc);
    instruction.halt();
    state.halted = true;
    state.instructions.push(new STOP());
    return instruction;
};
