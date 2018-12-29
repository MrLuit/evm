import Instruction from '../classes/instruction.class';

export default (opcode: any, state: any) => {
    const memoryLocation = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    instruction.setDebug();
    if (memoryLocation in state.memory) {
        instruction.setDescription('stack.push(%s);', state.memory[memoryLocation]);
        state.stack.push(state.memory[memoryLocation]);
    } else {
        instruction.setDescription('stack.push(memory[%s]);', memoryLocation);
        state.stack.push('memory[' + memoryLocation + ']');
    }
    return instruction;
};
