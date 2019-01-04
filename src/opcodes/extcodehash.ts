import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import Instruction from '../classes/instruction.class';

export default (opcode: Opcode, state: EVM): Instruction => {
    const address = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    instruction.setDebug();
    instruction.setDescription('stack.push(keccak256(address(%s).code);', address);
    state.stack.push('keccak256(address(' + address + ').code)');
    return instruction;
};
