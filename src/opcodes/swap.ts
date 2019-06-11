import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import Instruction from '../classes/instruction.class';

export default (opcode: Opcode, state: EVM): Instruction => {
    const swapLocation = parseInt(opcode.name.replace('SWAP', ''), 10);
    const instruction = new Instruction(opcode.name, opcode.pc);
    state.stack.swap(swapLocation);
    return instruction;
};
