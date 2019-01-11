import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';

export default (opcode: Opcode, state: EVM): void => {
    const swapLocation = parseInt(opcode.name.replace('SWAP', ''), 10);
    state.stack.swap(swapLocation);
};
