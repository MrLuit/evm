import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';

export class STOP {
    readonly name: string;
    readonly type?: string;
    readonly wrapped: boolean;

    constructor() {
        this.name = 'STOP';
        this.wrapped = true;
    }

    toString() {
        return 'return;';
    }
}

export default (opcode: Opcode, state: EVM): void => {
    state.halted = true;
    state.instructions.push(new STOP());
};
