import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import Instruction from '../classes/instruction.class';

export class GAS {
    readonly type: string;
    readonly static: boolean;

    constructor() {
        this.type = 'GAS';
        this.static = true;
    }

    toString() {
        return 'gasleft()';
    }
}

export default (opcode: Opcode, state: EVM): Instruction => {
    const instruction = new Instruction(opcode.name, opcode.pc);
    state.stack.push(new GAS());
    return instruction;
};
