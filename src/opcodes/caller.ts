import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';

export class CALLER {
    readonly name: string;
    readonly type?: string;
    readonly wrapped: boolean;

    constructor() {
        this.name = 'CALLER';
        this.name = 'address';
        this.wrapped = true;
    }

    toString() {
        return 'msg.sender';
    }
}

export default (opcode: Opcode, state: EVM): void => {
    state.stack.push(new CALLER());
};
