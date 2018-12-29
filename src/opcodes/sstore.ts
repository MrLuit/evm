import Instruction from '../classes/instruction.class';

export default (opcode: any, state: any) => {
    const storeLocation = state.stack.pop();
    const storeData = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    instruction.setDescription('storage[%s] = %s;', storeLocation, storeData);
    state.storage[storeLocation] = storeData;
    return instruction;
};
