import Instruction from '../classes/instruction.class';

export default (opcode: any, state: any) => {
    const stackItem = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    instruction.setDebug();
    if (!isNaN(parseInt(stackItem, 16))) {
        instruction.setDescription('stack.push(%s);', (~parseInt(stackItem, 16)).toString(16));
        state.stack.push((~parseInt(stackItem, 16)).toString(16));
    } else {
        instruction.setDescription('stack.push(~%s);', stackItem);
        state.stack.push('~' + stackItem);
    }
    return instruction;
};
