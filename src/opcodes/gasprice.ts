import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import Instruction from '../classes/instruction.class';

export class GASPRICE {
    readonly type: string;
    readonly static: boolean;

    constructor() {
        this.type = 'GASPRICE';
        this.static = true;
    }

    toString() {
        return 'tx.gasprice';
    }
}

export default (opcode: Opcode, state: EVM): Instruction => {
    const instruction = new Instruction(opcode.name, opcode.pc);
    state.stack.push(new GASPRICE());
    return instruction;
};
