import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import Instruction from '../classes/instruction.class';
import { SHL } from './shl';
import { SAR } from './sar';
import { SUB } from './sub';
import * as BigNumber from '../../node_modules/big-integer';

export default (opcode: Opcode, state: EVM): Instruction => {
    const left = state.stack.pop();
    const right = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    if (BigNumber.isInstance(left) && BigNumber.isInstance(right)) {
        state.stack.push(
            right.shiftLeft(BigNumber(32).subtract(left)).shiftRight(BigNumber(32).subtract(left))
        );
    } else if (BigNumber.isInstance(left)) {
        state.stack.push(
            new SAR(new SHL(right, BigNumber(32).subtract(left)), BigNumber(32).subtract(left))
        );
    } else {
        state.stack.push(
            new SAR(new SHL(right, new SUB(BigNumber(32), left)), new SUB(BigNumber(32), left))
        );
    }
    return instruction;
};
