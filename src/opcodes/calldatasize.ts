import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';

export class CALLDATASIZE {
    readonly name: string;
    readonly type?: string;
    readonly wrapped: boolean;

    constructor() {
        this.name = 'CALLDATASIZE';
        this.wrapped = true;
    }

    toString() {
        return 'msg.data.length';
    }
}

export default (opcode: Opcode, state: EVM): void => {
    state.stack.push(new CALLDATASIZE());
};
