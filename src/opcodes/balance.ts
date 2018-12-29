import Instruction from '../classes/instruction.class';

export default (opcode: any, state: any) => {
    const address = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    instruction.setDebug();
    instruction.setDescription('stack.push(%s.balance);', address);
    state.stack.push(address + '.balance');
    return instruction;
};
