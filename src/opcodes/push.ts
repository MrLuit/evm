import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import * as BigNumber from '../../node_modules/big-integer';

export default (opcode: Opcode, state: EVM): void => {
    const pushDataLength = parseInt(opcode.name.replace('PUSH', ''), 10);
    state.stack.push(BigNumber(opcode.pushData!.toString('hex'), 16));
};
