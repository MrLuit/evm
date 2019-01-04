import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import Instruction from '../classes/instruction.class';

export default (opcode: Opcode, state: EVM): Instruction => {
    const instruction = new Instruction(opcode.name, opcode.pc);
    instruction.setDebug();
    instruction.setDescription('stack.push(block.timestamp);');
    state.stack.push('block.timestamp');
    return instruction;
};
