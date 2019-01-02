import Instruction from '../classes/instruction.class';

export default (opcode: any, state: any) => {
    const address = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    instruction.setDebug();
    instruction.setDescription('stack.push(keccak256(address(%s).code);', address);
    state.stack.push('keccak256(address(' + address + ').code)');
    return instruction;
};
