import Instruction from '../classes/instruction.class';

export default (opcode: any, state: any) => {
    const memoryStart = state.stack.pop();
    const memoryLength = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    instruction.halt();
    if (!isNaN(parseInt(memoryStart, 16)) && !isNaN(parseInt(memoryLength, 16))) {
        if (parseInt(memoryLength, 16) === 32 && memoryStart in state.memory) {
            if (!isNaN(parseInt(state.memory[memoryStart], 16))) {
                instruction.setDescription(
                    'return %s;',
                    parseInt(state.memory[memoryStart], 16).toString()
                );
            } else {
                instruction.setDescription('return %s;', state.memory[memoryStart]);
            }
        } else {
            instruction.setDescription(
                'return memory[0x%s:0x%s];',
                memoryStart,
                (parseInt(memoryStart, 16) + parseInt(memoryLength, 16)).toString(16)
            );
        }
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
