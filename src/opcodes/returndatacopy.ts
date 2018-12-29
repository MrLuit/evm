import Instruction from '../classes/instruction.class';

export default (opcode: any, state: any) => {
    const memoryPosition = state.stack.pop();
    const returnDataPosition = state.stack.pop();
    const returnDataSize = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    instruction.setDescription(
        'memory[%s] = output[%s:(%s+%s)];',
        memoryPosition,
        returnDataPosition,
        returnDataPosition,
        returnDataSize
    );
    state.memory[memoryPosition] =
        'output[' + returnDataPosition + ':(' + returnDataPosition + '+' + returnDataSize + ')]';
    return instruction;
};
