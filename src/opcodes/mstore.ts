import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import Instruction from '../classes/instruction.class';

export default (opcode: Opcode, state: EVM): Instruction => {
    const storeLocation = state.stack.pop();
    const storeData = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    instruction.setDebug();
    instruction.setDescription('memory[0x%s] = %s;', storeLocation, storeData);
    state.memory[storeLocation] = storeData;
    return instruction;
};
