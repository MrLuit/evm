import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import stringify from '../utils/stringify';

export class RETURNDATACOPY {
    readonly name: string;
    readonly type?: string;
    readonly wrapped: boolean;
    readonly returnDataPosition: any;
    readonly returnDataSize: any;

    constructor(returnDataPosition: any, returnDataSize: any) {
        this.name = 'RETURNDATACOPY';
        this.wrapped = true;
        this.returnDataPosition = returnDataPosition;
        this.returnDataSize = returnDataSize;
    }

    toString() {
        return (
            'output[' +
            stringify(this.returnDataPosition) +
            ':(' +
            stringify(this.returnDataPosition) +
            '+' +
            stringify(this.returnDataSize) +
            ')]'
        );
    }
}

export default (opcode: Opcode, state: EVM): void => {
    const memoryPosition = state.stack.pop();
    const returnDataPosition = state.stack.pop();
    const returnDataSize = state.stack.pop();
    state.memory[memoryPosition] = new RETURNDATACOPY(returnDataPosition, returnDataSize);
};
