import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import Instruction from '../classes/instruction.class';

export default (opcode: Opcode, state: EVM): Instruction => {
    const stackItem1 = state.stack.pop();
    const stackItem2 = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    instruction.setDebug();
    if (!isNaN(parseInt(stackItem1, 16)) && !isNaN(parseInt(stackItem2, 16))) {
        const result = (parseInt(stackItem1, 16) / parseInt(stackItem2, 16)).toString(16);
        state.stack.push(result);
        instruction.setDescription('stack.push(%s);', result);
    } else if (stackItem1 === 'msg.data' && parseInt(stackItem2, 16) === 2 ** 224) {
        /* msg.data contains 32 bytes (33 including 0x), stackItem2 contains 29 bytes; only the first 4 bytes (function signature) are left */
        state.stack.push('msg.sig');
        instruction.setDescription('stack.push(msg.sig);');
    } else if (parseInt(stackItem2, 16) === 1) {
        state.stack.push(stackItem1);
        instruction.setDescription('stack.push(%s);', stackItem1);
    } else {
        state.stack.push('(' + stackItem1 + ' / ' + stackItem2 + ')');
        instruction.setDescription('stack.push(%s / %s);', stackItem1, stackItem2);
    }
    return instruction;
};
