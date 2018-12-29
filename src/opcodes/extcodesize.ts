import Instruction from '../classes/instruction.class';

export default (opcode: any, state: any) => {
    const address = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    instruction.setDebug();
    instruction.setDescription('stack.push(extcodesize(%s));', address);
    state.stack.push('extcodesize(' + address + ')');
    return instruction;
};
