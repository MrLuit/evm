import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import * as BigNumber from '../../node_modules/big-integer';
import stringify from '../utils/stringify';

export class MUL {
    readonly name: string;
    readonly type?: string;
    readonly wrapped: boolean;
    readonly left: any;
    readonly right: any;

    constructor(left: any, right: any) {
        this.name = 'MUL';
        this.wrapped = false;
        this.left = left;
        this.right = right;
    }

    toString() {
        return stringify(this.left) + ' * ' + stringify(this.right);
    }
}

export default (opcode: Opcode, state: EVM): void => {
    const left = state.stack.pop();
    const right = state.stack.pop();
    if (BigNumber.isInstance(left) && BigNumber.isInstance(right)) {
        state.stack.push(left.multiply(right));
    } else if (
        (BigNumber.isInstance(left) && left.isZero()) ||
        (BigNumber.isInstance(right) && right.isZero())
    ) {
        state.stack.push(BigNumber(0));
    } else {
        state.stack.push(new MUL(left, right));
    }
};
