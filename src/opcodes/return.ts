import Instruction from '../classes/instruction.class';

export default (opcode: any, state: any) => {
    const memoryStart = state.stack.pop();
    const memoryLength = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    instruction.halt();
    if (!isNaN(parseInt(memoryStart, 16)) && !isNaN(parseInt(memoryLength, 16))) {
        instruction.setDescription(
            'return memory[0x%s:0x%s];',
            memoryStart,
            (parseInt(memoryStart, 16) + parseInt(memoryLength, 16)).toString(16)
        );
    } else {
        instruction.setDescription(
            'return memory[0x%s:(0x%s+0x%s)];',
            memoryStart,
            memoryStart,
            memoryLength
        );
    }
    return instruction;
};
