import Instruction from '../classes/instruction.class';
import { isHex } from '../utils/hex';

export default (opcode: any, state: any) => {
    const stackItem = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    instruction.setDebug();
    if (isHex(stackItem)) {
        if (parseInt(stackItem, 16) === 0) {
            state.stack.push('1');
            instruction.setDescription('stack.push(1);');
        } else {
            state.stack.push('0');
            instruction.setDescription('stack.push(0);');
        }
    } else if (
        stackItem.startsWith('(') &&
        stackItem.endsWith(' == 0)') &&
        stackItem.split(' == 0').length === 2
    ) {
        /* ((x == 0) == 0) -> x */
        state.stack.push(stackItem.split(' == 0')[0].substr(1));
        instruction.setDescription('stack.push(%s);', stackItem.split(' == 0')[0].substr(1));
    } else if (stackItem.split(' == ').length === 2) {
        state.stack.push(stackItem.replace(' == ', ' != '));
        instruction.setDescription('stack.push(%s);', stackItem.replace(' == ', ' != '));
    } else if (stackItem.split(' != ').length === 2) {
        state.stack.push(stackItem.replace(' != ', ' == '));
        instruction.setDescription('stack.push(%s);', stackItem.replace(' != ', ' == '));
    } else if (stackItem.split(' >= ').length === 2) {
        state.stack.push(stackItem.replace(' >= ', ' < '));
        instruction.setDescription('stack.push(%s);', stackItem.replace(' >= ', ' < '));
    } else if (stackItem.split(' <= ').length === 2) {
        state.stack.push(stackItem.replace(' <= ', ' > '));
        instruction.setDescription('stack.push(%s);', stackItem.replace(' > ', ' <= '));
    } else if (stackItem.split(' > ').length === 2) {
        state.stack.push(stackItem.replace(' > ', ' <= '));
        instruction.setDescription('stack.push(%s);', stackItem.replace(' > ', ' <= '));
    } else if (stackItem.split(' < ').length === 2) {
        state.stack.push(stackItem.replace(' < ', ' >= '));
        instruction.setDescription('stack.push(%s);', stackItem.replace(' < ', ' >= '));
    } else {
        state.stack.push('(' + stackItem + ' == 0' + ')');
        instruction.setDescription('stack.push(' + stackItem + ' == 0);');
    }
    return instruction;
};
