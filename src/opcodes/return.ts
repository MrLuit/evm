import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import Instruction from '../classes/instruction.class';
import { isHex, pad32, default as formatHex } from '../utils/hex';

export default (opcode: Opcode, state: EVM): Instruction => {
    const memoryStart = state.stack.pop();
    const memoryLength = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    instruction.halt();
    if (isHex(memoryStart) && isHex(memoryLength)) {
        const memoryItems = [];
        for (
            let i = parseInt(memoryStart, 16);
            i < parseInt(memoryStart, 16) + parseInt(memoryLength, 16);
            i += 32
        ) {
            const memoryIndex = i.toString(16);
            if (memoryIndex in state.memory) {
                memoryItems.push(state.memory[memoryIndex]);
            } else {
                memoryItems.push('memory[0x' + memoryIndex + ']');
            }
        }
        if (memoryItems.every(item => !isNaN(parseInt(item, 16)))) {
            instruction.setDescription(
                'return %s;',
                formatHex(memoryItems.map(i => pad32(i.toString())).join(''))
            );
        } else {
            instruction.setDescription(
                'return %s;',
                formatHex(memoryItems.map(i => formatHex(i)).join(' + '))
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
