import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import Instruction from '../classes/instruction.class';

export default (opcode: Opcode, state: EVM): Instruction => {
    const stackItem1 = state.stack.pop();
    const stackItem2 = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    instruction.setDebug();
    instruction.setDescription(
        'stack.push(%s ^ %s);',
        stackItem1,
        stackItem2,
        stackItem1,
        stackItem2
    );
    state.stack.push('(' + stackItem1 + ' ^ ' + stackItem2 + ')');
    return instruction;
};
