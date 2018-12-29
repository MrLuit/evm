import Instruction from '../classes/instruction.class';

export default (opcode: any, state: any) => {
    const stackItem = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    instruction.setDebug();
    instruction.setDescription('stack.push(!(%s));', stackItem);
    state.stack.push('!(' + stackItem + ')');
    return instruction;
};
