import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import * as BigNumber from '../../node_modules/big-integer';
import stringify from '../utils/stringify';

export class OR {
    readonly name: string;
    readonly type?: string;
    readonly wrapped: boolean;
    readonly left: any;
    readonly right: any;

    constructor(left: any, right: any) {
        this.name = 'OR';
        this.wrapped = true;
        this.left = left;
        this.right = right;
    }

    toString() {
        return stringify(this.left) + ' || ' + stringify(this.right);
    }
}

export default (opcode: Opcode, state: EVM): void => {
    const left = state.stack.pop();
    const right = state.stack.pop();
    if (BigNumber.isInstance(left) && BigNumber.isInstance(right)) {
        state.stack.push(left.or(right));
    } else {
        state.stack.push(new OR(left, right));
    }
};
