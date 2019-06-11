import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import Instruction from '../classes/instruction.class';
import stringify from '../utils/stringify';

export class EXTCODEHASH {
    readonly type: string;
    readonly static: boolean;
    readonly address: any;

    constructor(address: any) {
        this.type = 'EXTCODEHASH';
        this.static = false;
        this.address = address;
    }

    toString() {
        return 'keccak256(address(' + stringify(this.address) + ').code)';
    }
}

export default (opcode: Opcode, state: EVM): Instruction => {
    const address = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    state.stack.push(new EXTCODEHASH(address));
    return instruction;
};
