import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';

export class GASPRICE {
    readonly name: string;
    readonly type?: string;
    readonly wrapped: boolean;

    constructor() {
        this.name = 'GASPRICE';
        this.wrapped = false;
    }

    toString() {
        return 'tx.gasprice';
    }
}

export default (opcode: Opcode, state: EVM): void => {
    state.stack.push(new GASPRICE());
};
