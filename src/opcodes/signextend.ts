import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import Instruction from '../classes/instruction.class';

export default (opcode: Opcode, state: EVM): Instruction => {
    const stackItem1 = state.stack.pop();
    const stackItem2 = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    instruction.setDebug();
    instruction.setDescription(
        'stack.push((%s << (32-%s))) >> (32-%s));',
        stackItem2,
        stackItem1,
        stackItem1
    );
    state.stack.push('(' + stackItem2 + ' << (32-' + stackItem1 + ')) >> (32-' + stackItem1 + ')');
    return instruction;
};
