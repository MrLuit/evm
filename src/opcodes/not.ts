import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import * as BigNumber from '../../node_modules/big-integer';
import stringify from '../utils/stringify';

export class NOT {
    readonly name: string;
    readonly type?: string;
    readonly wrapped: boolean;
    readonly item: any;

    constructor(item: any) {
        this.name = 'AND';
        this.wrapped = false;
        this.item = item;
    }

    toString() {
        return '~' + stringify(this.item);
    }
}

export default (opcode: Opcode, state: EVM): void => {
    const item = state.stack.pop();
    if (BigNumber.isInstance(item)) {
        state.stack.push(item.not());
    } else {
        state.stack.push(new NOT(item));
    }
};
