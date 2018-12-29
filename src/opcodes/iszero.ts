import Instruction from '../classes/instruction.class';

export default (opcode: any, state: any) => {
    const stackItem = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    instruction.setDebug();
    if (stackItem.startsWith('(') && stackItem.endsWith(' == 0)')) {
        /* ((x == 0) == 0) -> x */
        state.stack.push('(' + stackItem.replace('(', '').replace(' == 0)', '') + ')');
        instruction.setDescription(
            'stack.push(' + stackItem.replace('(', '').replace(' == 0)', '') + ');'
        );
    } else {
        state.stack.push('(' + stackItem + ' == 0' + ')');
        instruction.setDescription('stack.push(' + stackItem + ' == 0);');
    }
    return instruction;
};
