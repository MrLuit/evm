import Instruction from '../classes/instruction.class';

export default (opcode: any, state: any) => {
    const instruction = new Instruction(opcode.name, opcode.pc);
    instruction.setDebug();
    instruction.setDescription('stack.push(msg.data.length);');
    state.stack.push('msg.data.length');
    return instruction;
};
