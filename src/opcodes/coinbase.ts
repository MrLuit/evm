import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import Instruction from '../classes/instruction.class';

export class COINBASE {
    readonly type: string;
    readonly static: boolean;

    constructor() {
        this.type = 'COINBASE';
        this.static = true;
    }

    toString() {
        return 'block.coinbase';
    }
}

export default (opcode: Opcode, state: EVM): Instruction => {
    const instruction = new Instruction(opcode.name, opcode.pc);
    state.stack.push(new COINBASE());
    return instruction;
};
