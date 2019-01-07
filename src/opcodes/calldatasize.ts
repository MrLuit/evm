import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import Instruction from '../classes/instruction.class';

export class CALLDATASIZE {
    readonly type: string;
    readonly static: boolean;

    constructor() {
        this.type = 'CALLDATASIZE';
        this.static = true;
    }

    toString() {
        return 'msg.data.length';
    }
}

export default (opcode: Opcode, state: EVM): Instruction => {
    const instruction = new Instruction(opcode.name, opcode.pc);
    state.stack.push(new CALLDATASIZE());
    return instruction;
};
