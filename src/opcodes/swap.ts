import Instruction from '../classes/instruction.class';

export default (opcode: any, state: any) => {
    const swapLocation = parseInt(opcode.name.replace('SWAP', ''), 10);
    const firstStackItem = state.stack[state.stack.length - 1];
    const otherStackItem = state.stack[state.stack.length - (swapLocation + 1)];
    const instruction = new Instruction(opcode.name, opcode.pc);
    instruction.setDebug();
    instruction.setDescription(
        'stack[0] = %s; stack[%s] = %s;',
        otherStackItem,
        swapLocation.toString(),
        firstStackItem
    );
    state.stack[state.stack.length - (swapLocation + 1)] = firstStackItem;
    state.stack[state.stack.length - 1] = otherStackItem;
    return instruction;
};
