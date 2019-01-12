import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';

export class CODESIZE {
    readonly name: string;
    readonly type?: string;
    readonly wrapped: boolean;

    constructor() {
        this.name = 'CODESIZE';
        this.wrapped = false;
    }

    toString() {
        return 'this.code.length';
    }
}

export default (opcode: Opcode, state: EVM): void => {
    state.stack.push(new CODESIZE());
};
