import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';

export class ORIGIN {
    readonly name: string;
    readonly type?: string;
    readonly wrapped: boolean;

    constructor() {
        this.name = 'ORIGIN';
        this.wrapped = true;
    }

    toString() {
        return 'tx.origin';
    }
}

export default (opcode: Opcode, state: EVM): void => {
    state.stack.push(new ORIGIN());
};
