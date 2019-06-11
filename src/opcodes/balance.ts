import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import Instruction from '../classes/instruction.class';
import stringify from '../utils/stringify';

export class BALANCE {
    readonly type: string;
    readonly static: boolean;
    readonly address: any;

    constructor(address: any) {
        this.type = 'BALANCE';
        this.static = false;
        this.address = address;
    }

    toString() {
        return stringify(this.address) + '.balance';
    }
}

export default (opcode: Opcode, state: EVM): Instruction => {
    const address = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    state.stack.push(new BALANCE(address));
    return instruction;
};
