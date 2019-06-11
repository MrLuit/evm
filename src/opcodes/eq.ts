import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import Instruction from '../classes/instruction.class';
import * as BigNumber from '../../node_modules/big-integer';
import stringify from '../utils/stringify';

export class SIG {
    readonly type: string;
    readonly static: boolean;
    readonly hash: string;

    constructor(hash: string) {
        this.type = 'SIG';
        this.static = true;
        this.hash = hash;
    }

    toString() {
        return 'msg.sig == ' + this.hash;
    }
}

export class EQ {
    readonly type: string;
    readonly static: boolean;
    readonly left: any;
    readonly right: any;

    constructor(left: any, right: any) {
        this.type = 'EQ';
        this.static = false;
        this.left = left;
        this.right = right;
    }

    toString() {
        return stringify(this.left) + ' == ' + stringify(this.right);
    }
}

export default (opcode: Opcode, state: EVM): Instruction => {
    let left = state.stack.pop();
    let right = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    if (BigNumber.isInstance(left) && BigNumber.isInstance(right)) {
        state.stack.push(BigNumber(left.equals(right) === true ? 1 : 0));
    } else {
        if (
            BigNumber.isInstance(left) &&
            right.type === 'DIV' &&
            BigNumber.isInstance(right.right)
        ) {
            left = left.multiply(right.right);
            right = right.left;
        }
        if (
            BigNumber.isInstance(right) &&
            left.type === 'DIV' &&
            BigNumber.isInstance(left.right)
        ) {
            right = right.multiply(left.right);
            left = left.left;
        }
        if (
            BigNumber.isInstance(left) &&
            /^[0]+$/.test(left.toString(16).substring(8)) &&
            right.type === 'CALLDATALOAD' &&
            right.location.equals(0)
        ) {
            state.stack.push(
                new SIG(
                    '0'.repeat(64 - left.toString(16).length) +
                        left.toString(16).substring(0, 8 - (64 - left.toString(16).length))
                )
            );
        } else if (
            BigNumber.isInstance(right) &&
            /^[0]+$/.test(right.toString(16).substring(8)) &&
            left.type === 'CALLDATALOAD' &&
            left.location.equals(0)
        ) {
            state.stack.push(
                new SIG(
                    '0'.repeat(64 - right.toString(16).length) +
                        right.toString(16).substring(0, 8 - (64 - right.toString(16).length))
                )
            );
        } else {
            state.stack.push(new EQ(left, right));
        }
    }
    return instruction;
};
