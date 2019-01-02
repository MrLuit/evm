import Instruction from '../classes/instruction.class';

export default (opcode: any, state: any) => {
    const stackItem1 = state.stack.pop();
    const stackItem2 = state.stack.pop();
    const stackItem3 = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    instruction.setDebug();
    state.stack.push('((' + stackItem1 + ' * ' + stackItem2 + ') % ' + stackItem3 + ')');
    instruction.setDescription('stack.push((%s * %s) % %s);', stackItem1, stackItem2, stackItem3);
    return instruction;
};
