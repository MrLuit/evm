import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import stringify from '../utils/stringify';

export class EXTCODECOPY {
    readonly name: string;
    readonly type?: string;
    readonly wrapped: boolean;
    readonly address: any;
    readonly startLocation: any;
    readonly copyLength: any;

    constructor(address: any, startLocation: any, copyLength: any) {
        this.name = 'EXTCODECOPY';
        this.wrapped = false;
        this.address = address;
        this.startLocation = startLocation;
        this.copyLength = copyLength;
    }

    toString() {
        return (
            'address(' +
            stringify(this.address) +
            ').code[' +
            stringify(this.startLocation) +
            ':(' +
            stringify(this.startLocation) +
            '+' +
            stringify(this.copyLength) +
            ')]'
        );
    }
}

export default (opcode: Opcode, state: EVM): void => {
    const address = state.stack.pop();
    const memoryLocation = state.stack.pop();
    const startLocation = state.stack.pop();
    const copyLength = state.stack.pop();
    state.memory[memoryLocation] = new EXTCODECOPY(address, startLocation, copyLength);
};
