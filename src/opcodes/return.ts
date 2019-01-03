import Instruction from '../classes/instruction.class';
import formatHex from '../utils/hex';

function isHex(h: any) {
    const a = parseInt(h, 16);
    return a.toString(16) === h;
}

export default (opcode: any, state: any) => {
    const memoryStart = state.stack.pop();
    const memoryLength = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    instruction.halt();
    if (isHex(memoryStart) && isHex(memoryLength)) {
        //console.log(state.memory);
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
        /*const stringifiedMemoryItems = memoryItems.reduce((a: any,b: any) => {
            if(!isNaN(parseInt(a,16)) && !isNaN(parseInt(b,16))) {
                return (parseInt(a,16)+parseInt(b,16)).toString(16);
            } else {
                return false;
            }
        });*/
        const stringifiedMemoryItems = false;
        instruction.setDescription(
            'return %s;',
            stringifiedMemoryItems
                ? formatHex(stringifiedMemoryItems)
                : memoryItems.map(i => formatHex(i)).join(' + ')
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
