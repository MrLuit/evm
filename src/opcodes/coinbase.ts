import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';

export class COINBASE {
    readonly name: string;
    readonly type?: string;
    readonly wrapped: boolean;

    constructor() {
        this.name = 'COINBASE';
        this.wrapped = true;
    }

    toString() {
        return 'block.coinbase';
    }
}

export default (opcode: Opcode, state: EVM): void => {
    state.stack.push(new COINBASE());
};
