import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';

export default (opcode: Opcode, state: EVM): void => {
    const duplicateLocation = parseInt(opcode.name.replace('DUP', ''), 10) - 1;
    state.stack.duplicate(duplicateLocation);
};
