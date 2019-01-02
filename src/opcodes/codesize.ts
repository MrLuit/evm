import Instruction from '../classes/instruction.class';

export default (opcode: any, state: any) => {
    const instruction = new Instruction(opcode.name, opcode.pc);
    instruction.setDescription('stack.push(this.code.length);');
    state.stack.push('this.code.length');
    return instruction;
};
