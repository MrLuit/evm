import Instruction from '../classes/instruction.class';

export default (opcode: any, state: any) => {
    const instruction = new Instruction(opcode.name, opcode.pc);
    instruction.setDebug();
    instruction.setDescription('stack.push(block.number);');
    state.stack.push('block.number');
    return instruction;
};
