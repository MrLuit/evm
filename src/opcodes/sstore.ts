import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import Instruction from '../classes/instruction.class';
import * as BigNumber from '../../node_modules/big-integer';
import stringify from '../utils/stringify';

export class SSTORE {
    readonly type: string;
    readonly static: boolean;
    readonly location: any;
    readonly data: any;
    readonly storage: any;

    constructor(location: any, data: any, storage: any) {
        this.type = 'SSTORE';
        this.static = false;
        this.location = location;
        this.data = data;
        this.storage = storage;
    }

    toString() {
        if (BigNumber.isInstance(this.location) && this.location.toString(16) in this.storage) {
            return this.storage[this.location.toString(16)] + ' = ' + stringify(this.data) + ';';
        } else {
            return 'storage[' + stringify(this.location) + '] = ' + stringify(this.data) + ';';
        }
    }
}

export default (opcode: Opcode, state: EVM): Instruction => {
    const storeLocation = state.stack.pop();
    const storeData = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    state.instructions.push(new SSTORE(storeLocation, storeData, state.storage));
    return instruction;
};
