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
    if (parseInt(memoryLength, 16) === 0 && parseInt(outputLength, 16) === 0) {
        instruction.setDescription(
            'stack.push(address(%s).call.value(%s).gas(%s));',
            address,
            value,
            gas
        );
        state.stack.push('address(' + address + ').call.value(' + value + ').gas(' + gas + ')');
    } else {
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
    }
    return instruction;
};
