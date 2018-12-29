import Instruction from '../classes/instruction.class';

export default (opcode: any, state: any) => {
    const stackItem1 = state.stack.pop();
    const stackItem2 = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    instruction.setDebug();
    if (/^f*$/.test(stackItem1) || stackItem1 === '10000000000000000000000000000000000000000') {
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
