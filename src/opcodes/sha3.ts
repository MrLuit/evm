import Instruction from '../classes/instruction.class';

export default (opcode: any, state: any) => {
    const memoryStart = state.stack.pop();
    const memoryLength = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    instruction.setDebug();
    if (memoryStart === '00') {
        state.stack.push('sha3(memory[0x00:0x' + memoryLength + '])');
        instruction.setDescription('stack.push(sha3(memory[0x00:0x%s]));', memoryLength);
    } else {
        state.stack.push(
            'sha3(memory[0x' + memoryStart + ':(0x' + memoryStart + '+0x' + memoryLength + ')])'
        );
        instruction.setDescription(
            'stack.push(sha3(memory[0x%s:(0x%s+0x%s)]));',
            memoryStart,
            memoryStart,
            memoryLength
        );
    }
    return instruction;
};
