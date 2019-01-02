import Instruction from '../classes/instruction.class';

export default (opcode: any, state: any) => {
    const storeLocation = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    instruction.setDebug();
    if (!isNaN(parseInt(storeLocation, 16))) {
        instruction.setDescription('stack.push(storage[0x%s]);', storeLocation);
        state.stack.push('storage[0x' + storeLocation + ']');
    } else {
        instruction.setDescription('stack.push(storage[%s]);', storeLocation);
        state.stack.push('storage[' + storeLocation + ']');
    }
    return instruction;
};
