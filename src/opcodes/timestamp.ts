import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import Instruction from '../classes/instruction.class';

export class TIMESTAMP {
    readonly type: string;
    readonly static: boolean;

    constructor() {
        this.type = 'TIMESTAMP';
        this.static = true;
    }

    toString() {
        return 'block.timestamp';
    }
}

export default (opcode: Opcode, state: EVM): Instruction => {
    const instruction = new Instruction(opcode.name, opcode.pc);
    state.stack.push(new TIMESTAMP());
    return instruction;
};
