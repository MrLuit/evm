import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';

export class MSIZE {
    readonly name: string;
    readonly type?: string;
    readonly wrapped: boolean;

    constructor() {
        this.name = 'MSIZE';
        this.wrapped = false;
    }

    toString() {
        return 'memory.length';
    }
}

export default (opcode: Opcode, state: EVM): void => {
    state.stack.push(new MSIZE());
};
