import Instruction from '../classes/instruction.class';

export default (opcode: any, state: any) => {
    const address = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    instruction.setDescription('selfdestruct(%s);', address);
    return instruction;
};
