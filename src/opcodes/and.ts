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
        /* For some reason Buffer.from() sometimes fails in the browser */
        try {
            const result = Buffer.from(stackItem1, 'hex') && Buffer.from(stackItem2, 'hex');
            state.stack.push(result.toString('hex'));
            instruction.setDescription('stack.push(%s);', result.toString('hex'));
        } catch (e) {
            state.stack.push('(' + stackItem1 + ' && ' + stackItem2 + ')');
            instruction.setDescription('stack.push(%s && %s);', stackItem1, stackItem2);
        }
    } else if (stackItem1 === '0') {
        state.stack.push(stackItem2);
        instruction.setDescription('stack.push(%s);', stackItem2);
    } else if (stackItem2 === '0') {
        state.stack.push(stackItem1);
        instruction.setDescription('stack.push(%s);', stackItem1);
    } else if (
        /^f*$/.test(stackItem1) ||
        stackItem1 === '10000000000000000000000000000000000000000'
    ) {
        // Since type / length matching is not really useful for our use case, we won't include it
        state.stack.push(stackItem2);
        instruction.setDescription('stack.push(%s);', stackItem2);
    } else if (
        /^f*$/.test(stackItem2) ||
        stackItem2 === '10000000000000000000000000000000000000000'
    ) {
        // Since type / length matching is not really useful for our use case, we won't include it
        state.stack.push(stackItem1);
        instruction.setDescription('stack.push(%s);', stackItem1);
    } else {
        state.stack.push('(' + stackItem1 + ' && ' + stackItem2 + ')');
        instruction.setDescription('stack.push(%s && %s);', stackItem1, stackItem2);
    }
    return instruction;
};
