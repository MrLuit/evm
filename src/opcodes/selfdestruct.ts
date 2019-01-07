import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import Instruction from '../classes/instruction.class';
import stringify from '../utils/stringify';

export class SELFDESTRUCT {
    readonly type: string;
    readonly static: boolean;
    readonly address: any;

    constructor(address: any) {
        this.type = 'SELFDESTRUCT';
        this.static = false;
        this.address = address;
    }

    toString() {
        return 'selfdestruct(' + stringify(this.address) + ');';
    }
}

export default (opcode: Opcode, state: EVM): Instruction => {
    const address = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    state.halted = true;
    state.instructions.push(new SELFDESTRUCT(address));
    return instruction;
};
