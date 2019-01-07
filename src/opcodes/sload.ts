import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import Instruction from '../classes/instruction.class';
import * as BigNumber from '../../node_modules/big-integer';
import stringify from '../utils/stringify';

export class SLOAD {
    readonly type: string;
    readonly static: boolean;
    readonly location: any;
    readonly storage: any;

    constructor(location: any, storage: any) {
        this.type = 'SLOAD';
        this.static = true;
        this.location = location;
        this.storage = storage;
    }

    toString() {
        if (BigNumber.isInstance(this.location) && this.location.toString(16) in this.storage) {
            return this.storage[this.location.toString(16)];
        } else {
            return 'storage[' + stringify(this.location) + ']';
        }
    }
}

export default (opcode: Opcode, state: EVM): Instruction => {
    const storeLocation = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    state.stack.push(new SLOAD(storeLocation, state.storage));
    return instruction;
};
