import Instruction from '../classes/instruction.class';

export default (opcode: any, state: any) => {
    const memoryLocation = state.stack.pop();
    const startLocation = state.stack.pop();
    const copyLength = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    instruction.setDescription(
        'memory[%s] = this.code[%s:(%s+%s)];',
        memoryLocation,
        startLocation,
        startLocation,
        copyLength
    );
    state.memory[memoryLocation] =
        'this.code[' + startLocation + ':(' + startLocation + '+' + copyLength + ')]';
    return instruction;
};
