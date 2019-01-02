import Instruction from '../classes/instruction.class';

export default (opcode: any, state: any) => {
    const position = state.stack.pop();
    const data = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    instruction.setDebug();
    instruction.setDescription('stack.push((%s >> %s) & 1);', data, position);
    state.stack.push('(' + data + ' >> ' + position + ') & 1');
    return instruction;
};
