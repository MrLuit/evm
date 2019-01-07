import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import Instruction from '../classes/instruction.class';
import * as BigNumber from '../../node_modules/big-integer';
import stringify from '../utils/stringify';

export class AND {
    readonly type: string;
    readonly static: boolean;
    readonly left: any;
    readonly right: any;

    constructor(left: any, right: any) {
        this.type = 'AND';
        this.static = false;
        this.left = left;
        this.right = right;
    }

    toString() {
        return stringify(this.left) + ' && ' + stringify(this.right);
    }
}

export default (opcode: Opcode, state: EVM): Instruction => {
    const left = state.stack.pop();
    const right = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    if (BigNumber.isInstance(left) && BigNumber.isInstance(right)) {
        state.stack.push(left.and(right));
    } else if (BigNumber.isInstance(left) && /^[f]+$/.test(left.toString(16))) {
        right.size = left.toString(16).length;
        state.stack.push(right);
    } else if (BigNumber.isInstance(right) && /^[f]+$/.test(right.toString(16))) {
        left.size = right.toString(16).length;
        state.stack.push(left);
        /*} else if (
        BigNumber.isInstance(left) &&
        left.equals('1461501637330902918203684832716283019655932542975')
    ) {*/
        /* 2 ** 160 */
        /*    state.stack.push(right);
    } else if (
        BigNumber.isInstance(right) &&
        right.equals('1461501637330902918203684832716283019655932542975')
    ) {*/
        /* 2 ** 160 */
        /*    state.stack.push(left);*/
    } else if (
        BigNumber.isInstance(left) &&
        right instanceof AND &&
        BigNumber.isInstance(right.left) &&
        left.equals(right.left)
    ) {
        state.stack.push(right.right);
    } else {
        state.stack.push(new AND(left, right));
    }
    return instruction;
};
