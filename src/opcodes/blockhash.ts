import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import Instruction from '../classes/instruction.class';
import stringify from '../utils/stringify';

export class BLOCKHASH {
    readonly type: string;
    readonly static: boolean;
    readonly number: any;

    constructor(blockNumber: any) {
        this.type = 'BLOCKHASH';
        this.static = false;
        this.number = blockNumber;
    }

    toString() {
        return 'block.blockhash(' + stringify(this.number) + ')';
    }
}

export default (opcode: Opcode, state: EVM): Instruction => {
    const blockNumber = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    state.stack.push(new BLOCKHASH(blockNumber));
    return instruction;
};
