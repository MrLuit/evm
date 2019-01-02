import Instruction from '../classes/instruction.class';

export default (opcode: any, state: any) => {
    const stackItem1 = state.stack.pop();
    const stackItem2 = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    instruction.setDebug();
    if (!isNaN(parseInt(stackItem1, 16)) && !isNaN(parseInt(stackItem2, 16))) {
        state.stack.push(parseInt(stackItem1, 16) ** parseInt(stackItem2, 16));
        instruction.setDescription(
            'stack.push(%s);',
            (parseInt(stackItem1, 16) ** parseInt(stackItem2, 16)).toString()
        );
    } else {
        state.stack.push('(' + stackItem1 + ' ** ' + stackItem2 + ')');
        instruction.setDescription('stack.push(%s ** %s);', stackItem1, stackItem2);
    }
    return instruction;
};
