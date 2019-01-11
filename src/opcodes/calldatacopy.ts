import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';

export class CALLDATACOPY {
    readonly name: string;
    readonly type?: string;
    readonly wrapped: boolean;
    readonly startLocation: any;
    readonly copyLength: any;

    constructor(startLocation: any, copyLength: any) {
        this.name = 'CALLDATACOPY';
        this.wrapped = false;
        this.startLocation = startLocation;
        this.copyLength = copyLength;
    }

    toString() {
        return (
            'msg.data[' +
            this.startLocation +
            ':(' +
            this.startLocation +
            '+' +
            this.copyLength +
            ')];'
        );
    }
}

export default (opcode: Opcode, state: EVM): void => {
    const memoryLocation = state.stack.pop();
    const startLocation = state.stack.pop();
    const copyLength = state.stack.pop();
    state.memory[memoryLocation] = new CALLDATACOPY(startLocation, copyLength);
};
