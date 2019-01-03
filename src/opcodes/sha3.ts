import Instruction from '../classes/instruction.class';

export default (opcode: any, state: any) => {
    const memoryStart = state.stack.pop();
    const memoryLength = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    instruction.setDebug();
    if (!isNaN(parseInt(memoryStart, 16)) && !isNaN(parseInt(memoryLength, 16))) {
        const memoryItems = [];
        for (
            let i = parseInt(memoryStart, 16);
            i < parseInt(memoryStart, 16) + parseInt(memoryLength, 16);
            i += 32
        ) {
            const memoryIndex = '0'.repeat(2 - i.toString(16).length) + i.toString(16);
            if (memoryIndex in state.memory) {
                memoryItems.push(state.memory[memoryIndex]);
            } else {
                memoryItems.push('memory[0x' + memoryIndex + ']');
            }
        }
        state.stack.push('keccak256(' + memoryItems.join(' + ') + ')');
        instruction.setDescription('keccak256(%s);', memoryItems.join(' + '));
    } else if (memoryStart === '00') {
        state.stack.push('keccak256(memory[0x00:0x' + memoryLength + '])');
        instruction.setDescription('stack.push(keccak256(memory[0x00:0x%s]));', memoryLength);
    } else {
        state.stack.push(
            'keccak256(memory[0x' +
                memoryStart +
                ':(0x' +
                memoryStart +
                '+0x' +
                memoryLength +
                ')])'
        );
        instruction.setDescription(
            'stack.push(keccak256(memory[0x%s:(0x%s+0x%s)]));',
            memoryStart,
            memoryStart,
            memoryLength
        );
    }
    return instruction;
};
