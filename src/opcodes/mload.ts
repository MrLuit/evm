import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import Instruction from '../classes/instruction.class';
import * as BigNumber from '../../node_modules/big-integer';
import stringify from '../utils/stringify';

export class MLOAD {
    readonly type: string;
    readonly static: boolean;
    readonly location: any;

    constructor(location: any) {
        this.type = 'MLOAD';
        this.static = false;
        this.location = location;
    }

    toString() {
        return 'memory[' + stringify(this.location) + ']';
    }
}

export default (opcode: Opcode, state: EVM): Instruction => {
    const memoryLocation = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    if (BigNumber.isInstance(memoryLocation) && memoryLocation.toJSNumber() in state.memory) {
        state.stack.push(state.memory[memoryLocation.toJSNumber()]);
    } else {
        state.stack.push(new MLOAD(memoryLocation));
    }
    return instruction;
};
