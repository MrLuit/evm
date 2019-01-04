import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import Instruction from '../classes/instruction.class';
import { isHex } from '../utils/hex';

export default (opcode: Opcode, state: EVM): Instruction => {
    const stackItem1 = state.stack.pop();
    const stackItem2 = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    instruction.setDebug();
    if (isHex(stackItem1) && isHex(stackItem2)) {
        if (parseInt(stackItem1, 16) > parseInt(stackItem2, 16)) {
            instruction.setDescription('stack.push(1);');
            state.stack.push('1');
        } else {
            instruction.setDescription('stack.push(0);');
            state.stack.push('0');
        }
    } else {
        instruction.setDescription('stack.push(%s > %s);', stackItem1, stackItem2);
        state.stack.push('(' + stackItem1 + ' > ' + stackItem2 + ')');
    }
    return instruction;
};
