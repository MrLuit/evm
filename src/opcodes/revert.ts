import Instruction from '../classes/instruction.class';

export default (opcode: any, state: any) => {
    const memoryStart = state.stack.pop();
    const memoryLength = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    instruction.halt();
    if (memoryStart === '00' && memoryLength === '00') {
        instruction.setDescription('revert();');
    } else if (memoryStart === '00') {
        instruction.setDescription('revert(memory[0x00:0x%s]);', memoryLength);
    } else {
        instruction.setDescription(
            'revert(memory[0x%s:(0x%s+0x%s)]);',
            memoryStart,
            memoryStart,
            memoryLength
        );
    }
    return instruction;
};
