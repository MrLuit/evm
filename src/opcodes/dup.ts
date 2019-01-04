import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import Instruction from '../classes/instruction.class';

export default (opcode: Opcode, state: EVM): Instruction => {
    const duplicateLocation = parseInt(opcode.name.replace('DUP', ''), 10) - 1;
    const instruction = new Instruction(opcode.name, opcode.pc);
    instruction.setDebug();
    instruction.setDescription('stack.duplicate(%s);', duplicateLocation.toString());
    state.stack.duplicate(duplicateLocation);
    return instruction;
};
