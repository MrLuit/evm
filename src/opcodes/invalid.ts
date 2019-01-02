import Instruction from '../classes/instruction.class';

export default (opcode: any, state: any) => {
    const instruction = new Instruction(opcode.name, opcode.pc);
    instruction.halt();
    instruction.setDescription('INVALID (0x%d)', opcode.opcode);
    return instruction;
};
