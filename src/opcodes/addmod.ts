import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import { ADD } from './add';
import { MOD } from './mod';
import * as BigNumber from '../../node_modules/big-integer';

export default (opcode: Opcode, state: EVM): void => {
    const left = state.stack.pop();
    const right = state.stack.pop();
    const mod = state.stack.pop();
    if (BigNumber.isInstance(left) && BigNumber.isInstance(right) && BigNumber.isInstance(mod)) {
        state.stack.push(left.add(right).mod(mod));
    } else if (BigNumber.isInstance(left) && BigNumber.isInstance(right)) {
        state.stack.push(new MOD(left.add(right), mod));
    } else {
        state.stack.push(new MOD(new ADD(left, right), mod));
    }
};
