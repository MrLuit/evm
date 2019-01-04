import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import Instruction from '../classes/instruction.class';

export default (opcode: Opcode, state: EVM): Instruction => {
    const startLocation = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    instruction.setDebug();
    if (startLocation === '00') {
        instruction.setDescription('stack.push(msg.data);');
        state.stack.push('msg.data');
    } else {
        instruction.setDescription('stack.push(msg.data[0x%s]);', startLocation);
        state.stack.push('msg.data[0x' + startLocation + ']');
    }
    return instruction;
};
