import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';

export class ADDRESS {
    readonly name: string;
    readonly type?: string;
    readonly wrapped: boolean;

    constructor() {
        this.name = 'ADDRESS';
        this.type = 'address';
        this.wrapped = false;
    }

    toString() {
        return 'this';
    }
}

export default (opcode: Opcode, state: EVM): void => {
    state.stack.push(new ADDRESS());
};
