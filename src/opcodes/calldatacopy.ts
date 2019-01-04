import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import Instruction from '../classes/instruction.class';

export default (opcode: Opcode, state: EVM): Instruction => {
    const memoryLocation = state.stack.pop();
    const startLocation = state.stack.pop();
    const copyLength = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    instruction.setDescription(
        'memory[%s] = msg.data[%s:(%s+%s)];',
        memoryLocation,
        startLocation,
        startLocation,
        copyLength
    );
    state.memory[memoryLocation] =
        'msg.data[' + startLocation + ':(' + startLocation + '+' + copyLength + ')]';
    return instruction;
};
