import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import { MUL } from './mul';
import { MOD } from './mod';
import * as BigNumber from '../../node_modules/big-integer';

export default (opcode: Opcode, state: EVM): void => {
    const left = state.stack.pop();
    const right = state.stack.pop();
    const mod = state.stack.pop();
    if (BigNumber.isInstance(left) && BigNumber.isInstance(right) && BigNumber.isInstance(mod)) {
        state.stack.push(left.multiply(right).mod(mod));
    } else if (BigNumber.isInstance(left) && BigNumber.isInstance(right)) {
        state.stack.push(new MOD(left.multiply(right), mod));
    } else {
        state.stack.push(new MOD(new MUL(left, right), mod));
    }
};
