import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import Instruction from '../classes/instruction.class';

export default (opcode: Opcode, state: EVM): Instruction => {
    const memoryLocation = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    instruction.setDebug();
    if (memoryLocation in state.memory) {
        instruction.setDescription('stack.push(%s);', state.memory[memoryLocation]);
        state.stack.push(state.memory[memoryLocation]);
    } else {
        instruction.setDescription('stack.push(memory[%s]);', memoryLocation);
        state.stack.push('memory[' + memoryLocation + ']');
    }
    return instruction;
};
