import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';

export class DIFFICULTY {
    readonly name: string;
    readonly type?: string;
    readonly wrapped: boolean;

    constructor() {
        this.name = 'DIFFICULTY';
        this.wrapped = true;
    }

    toString() {
        return 'block.difficulty';
    }
}

export default (opcode: Opcode, state: EVM): void => {
    state.stack.push(new DIFFICULTY());
};
