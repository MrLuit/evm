import Instruction from '../classes/instruction.class';

export default (opcode: any, state: any) => {
    const storeLocation = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    instruction.setDescription('stack.push(storage[%s]);', storeLocation);
    instruction.setDebug();
    state.stack.push('storage[' + storeLocation + ']');
    return instruction;
};
