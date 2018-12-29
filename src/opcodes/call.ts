import Instruction from '../classes/instruction.class';

export default (opcode: any, state: any) => {
    const gas = state.stack.pop();
    const address = state.stack.pop();
    const value = state.stack.pop();
    const memoryStart = state.stack.pop();
    const memoryLength = state.stack.pop();
    const outputStart = state.stack.pop();
    const outputLength = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    instruction.setDebug();
    instruction.setDescription(
        'stack.push(call(%s,%s,%s,%s,%s,%s,%s));',
        gas,
        address,
        value,
        memoryStart,
        memoryLength,
        outputStart,
        outputLength
    );
    state.stack.push(
        'call(' +
            gas +
            ',' +
            address +
            ',' +
            value +
            ',' +
            memoryStart +
            ',' +
            memoryLength +
            ',' +
            outputStart +
            ',' +
            outputLength +
            ')'
    );
    return instruction;
};
