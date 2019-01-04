import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import Instruction from '../classes/instruction.class';

export default (opcode: Opcode, state: EVM): Instruction => {
    const address = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    instruction.setDescription('selfdestruct(%s);', address);
    return instruction;
};
