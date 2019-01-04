import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import Instruction from '../classes/instruction.class';

export default (opcode: Opcode, state: EVM): Instruction => {
    const value = state.stack.pop();
    const memoryStart = state.stack.pop();
    const memoryLength = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    instruction.setDebug();
    instruction.setDescription(
        'stack.push((new Contract(memory[0x%s:0x%s])).value(%s).address);',
        memoryStart,
        memoryLength,
        value
    );
    state.stack.push(
        '(new Contract(memory[0x' +
            memoryStart +
            ':0x' +
            memoryLength +
            '])).value(' +
            value +
            ').address'
    );
    return instruction;
};
