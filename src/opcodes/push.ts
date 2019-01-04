import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import Instruction from '../classes/instruction.class';

export default (opcode: Opcode, state: EVM): Instruction => {
    const pushDataLength = parseInt(opcode.name.replace('PUSH', ''), 10);
    const instruction = new Instruction(opcode.name, opcode.pc);
    instruction.setDebug();
    if (!('pushData' in opcode)) {
        throw new Error('PUSH without pushData');
    } else if (opcode.pushData!.length !== pushDataLength) {
        throw new Error('pushData length did not not match opcode');
    } else {
        instruction.setDescription('stack.push(%s);', opcode.pushData!.toString('hex'));
        state.stack.push(opcode.pushData!.toString('hex'));
    }
    return instruction;
};
