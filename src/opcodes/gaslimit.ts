import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';

export class GASLIMIT {
    readonly name: string;
    readonly type?: string;
    readonly wrapped: boolean;

    constructor() {
        this.name = 'GASLIMIT';
        this.wrapped = false;
    }

    toString() {
        return 'block.gaslimit';
    }
}

export default (opcode: Opcode, state: EVM): void => {
    state.stack.push(new GASLIMIT());
};
