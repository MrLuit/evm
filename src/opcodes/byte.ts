import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import Instruction from '../classes/instruction.class';

export default (opcode: Opcode, state: EVM): Instruction => {
    const position = state.stack.pop();
    const data = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    instruction.setDebug();
    instruction.setDescription('stack.push((%s >> %s) & 1);', data, position);
    state.stack.push('(' + data + ' >> ' + position + ') & 1');
    return instruction;
};
