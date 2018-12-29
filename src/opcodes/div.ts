import Instruction from '../classes/instruction.class';

export default (opcode: any, state: any) => {
    const stackItem1 = state.stack.pop();
    const stackItem2 = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    instruction.setDebug();
    if (
        stackItem1 === 'msg.data' &&
        (stackItem2 === '0100000000000000000000000000000000000000000000000000000000' ||
            stackItem2 === '100000000000000000000000000000000000000000000000000000000')
    ) {
        /* msg.data contains 32 bytes (33 including 0x), stackItem2 contains 29 bytes; only the first 4 bytes (function signature) are left */

        state.stack.push('msg.sig');
        instruction.setDescription('stack.push(msg.sig);');
    } else {
        state.stack.push('(' + stackItem1 + ' / ' + stackItem2 + ')');
        instruction.setDescription('stack.push(%s / %s);', stackItem1, stackItem2);
    }
    return instruction;
};
