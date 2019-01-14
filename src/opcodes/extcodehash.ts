import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import stringify from '../utils/stringify';

export class EXTCODEHASH {
    readonly name: string;
    readonly type?: string;
    readonly wrapped: boolean;
    readonly address: any;

    constructor(address: any) {
        this.name = 'EXTCODEHASH';
        this.wrapped = true;
        this.address = address;
    }

    toString() {
        return 'keccak256(address(' + stringify(this.address) + ').code)';
    }
}

export default (opcode: Opcode, state: EVM): void => {
    const address = state.stack.pop();
    state.stack.push(new EXTCODEHASH(address));
};
