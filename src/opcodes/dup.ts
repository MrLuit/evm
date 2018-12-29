import Instruction from '../classes/instruction.class';

export default (opcode: any, state: any) => {
    const duplicateLocation = parseInt(opcode.name.replace('DUP', ''), 10);
    const duplicateItem = state.stack[state.stack.length - duplicateLocation];
    const instruction = new Instruction(opcode.name, opcode.pc);
    instruction.setDebug();
    instruction.setDescription('stack.push(%s);', duplicateItem);
    state.stack.push(duplicateItem);
    return instruction;
};
