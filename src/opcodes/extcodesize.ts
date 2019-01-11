import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import stringify from '../utils/stringify';

export class EXTCODESIZE {
    readonly name: string;
    readonly type?: string;
    readonly wrapped: boolean;
    readonly address: any;

    constructor(address: any) {
        this.name = 'EXTCODESIZE';
        this.wrapped = false;
        this.address = address;
    }

    toString() {
        return 'address(' + stringify(this.address) + ').code.length';
    }
}

export default (opcode: Opcode, state: EVM): void => {
    const address = state.stack.pop();
    state.stack.push(new EXTCODESIZE(address));
};
