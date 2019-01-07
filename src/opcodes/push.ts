import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import Instruction from '../classes/instruction.class';
import * as BigNumber from '../../node_modules/big-integer';

export default (opcode: Opcode, state: EVM): Instruction => {
    const pushDataLength = parseInt(opcode.name.replace('PUSH', ''), 10);
    const instruction = new Instruction(opcode.name, opcode.pc);
    state.stack.push(BigNumber(opcode.pushData!.toString('hex'), 16));
    return instruction;
};
