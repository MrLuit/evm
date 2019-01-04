import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import Instruction from '../classes/instruction.class';

export default (opcode: Opcode, state: EVM): Instruction => {
    const stackItem1 = state.stack.pop();
    const stackItem2 = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    instruction.setDebug();
    if (stackItem1 === '00' || stackItem2 === '00') {
        state.stack.push('00');
        instruction.setDescription('stack.push(00);');
    } else if (!isNaN(parseInt(stackItem1, 16)) && !isNaN(parseInt(stackItem2, 16))) {
        state.stack.push((parseInt(stackItem1, 16) * parseInt(stackItem2, 16)).toString(16));
        instruction.setDescription(
            'stack.push(%d);',
            (parseInt(stackItem1, 16) * parseInt(stackItem2, 16)).toString(16)
        );
    } else {
        state.stack.push('(' + stackItem1 + ' * ' + stackItem2 + ')');
        instruction.setDescription('stack.push(%s * %s);', stackItem1, stackItem2);
    }
    return instruction;
};
