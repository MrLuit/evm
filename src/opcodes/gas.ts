import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';

export class GAS {
    readonly name: string;
    readonly type?: string;
    readonly wrapped: boolean;

    constructor() {
        this.name = 'GAS';
        this.wrapped = false;
    }

    toString() {
        return 'gasleft()';
    }
}

export default (opcode: Opcode, state: EVM): void => {
    state.stack.push(new GAS());
};
