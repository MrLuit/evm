import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import * as BigNumber from '../../node_modules/big-integer';
import stringify from '../utils/stringify';

export class MLOAD {
    readonly name: string;
    readonly type?: string;
    readonly wrapped: boolean;
    readonly location: any;

    constructor(location: any) {
        this.name = 'MLOAD';
        this.wrapped = true;
        this.location = location;
    }

    toString() {
        return 'memory[' + stringify(this.location) + ']';
    }
}

export default (opcode: Opcode, state: EVM): void => {
    const memoryLocation = state.stack.pop();
    if (BigNumber.isInstance(memoryLocation) && memoryLocation.toJSNumber() in state.memory) {
        state.stack.push(state.memory[memoryLocation.toJSNumber()]);
    } else {
        state.stack.push(new MLOAD(memoryLocation));
    }
};
