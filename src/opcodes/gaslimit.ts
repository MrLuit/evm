import Instruction from '../classes/instruction.class';

export default (opcode: any, state: any) => {
    const instruction = new Instruction(opcode.name, opcode.pc);
    instruction.setDebug();
    instruction.setDescription('stack.push(block.gaslimit);');
    state.stack.push('block.gaslimit');
    return instruction;
};
