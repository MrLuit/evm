import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import Instruction from '../classes/instruction.class';

export class ORIGIN {
    readonly type: string;
    readonly static: boolean;

    constructor() {
        this.type = 'ORIGIN';
        this.static = true;
    }

    toString() {
        return 'tx.origin';
    }
}

export default (opcode: Opcode, state: EVM): Instruction => {
    const instruction = new Instruction(opcode.name, opcode.pc);
    state.stack.push(new ORIGIN());
    return instruction;
};
