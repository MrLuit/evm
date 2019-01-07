import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import Instruction from '../classes/instruction.class';
import { MUL } from './mul';
import { MOD } from './mod';
import * as BigNumber from '../../node_modules/big-integer';

export default (opcode: Opcode, state: EVM): Instruction => {
    const left = state.stack.pop();
    const right = state.stack.pop();
    const mod = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    if (BigNumber.isInstance(left) && BigNumber.isInstance(right) && BigNumber.isInstance(mod)) {
        state.stack.push(left.multiply(right).mod(mod));
    } else if (BigNumber.isInstance(left) && BigNumber.isInstance(right)) {
        state.stack.push(new MOD(left.multiply(right), mod));
    } else {
        state.stack.push(new MOD(new MUL(left, right), mod));
    }
    return instruction;
};
