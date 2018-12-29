import Instruction from '../classes/instruction.class';

export default (opcode: any, state: any) => {
    const instruction = new Instruction(opcode.name, opcode.pc);
    instruction.setDebug();
    instruction.setDescription('stack.push(%s);', opcode.pushData.toString('hex'));
    state.stack.push(opcode.pushData.toString('hex'));
    return instruction;
};
