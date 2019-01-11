import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import * as BigNumber from '../../node_modules/big-integer';
import stringify from '../utils/stringify';

export class MSTORE {
    readonly name: string;
    readonly type?: string;
    readonly wrapped: boolean;
    readonly location: any;
    readonly data: any;

    constructor(location: any, data: any) {
        this.name = 'MSTORE';
        this.wrapped = false;
        this.location = location;
        this.data = data;
    }

    toString() {
        return 'memory[' + stringify(this.location) + '] = ' + stringify(this.data) + ';';
    }
}

export default (opcode: Opcode, state: EVM): void => {
    const storeLocation = state.stack.pop();
    const storeData = state.stack.pop();
    if (BigNumber.isInstance(storeLocation)) {
        state.memory[storeLocation.toJSNumber()] = storeData;
    } else {
        state.instructions.push(new MSTORE(storeLocation, storeData));
    }
};
