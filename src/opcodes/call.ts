import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import stringify from '../utils/stringify';

export class CALL {
    readonly name: string;
    readonly type?: string;
    readonly wrapped: boolean;
    readonly gas: any;
    readonly address: any;
    readonly value: any;
    readonly memoryStart: any;
    readonly memoryLength: any;
    readonly outputStart: any;
    readonly outputLength: any;

    constructor(
        gas: any,
        address: any,
        value: any,
        memoryStart: any,
        memoryLength: any,
        outputStart: any,
        outputLength: any
    ) {
        this.name = 'CALL';
        this.wrapped = false;
        this.gas = gas;
        this.address = address;
        this.value = value;
        this.memoryStart = memoryStart;
        this.memoryLength = memoryLength;
        this.outputStart = outputStart;
        this.outputLength = outputLength;
    }

    toString() {
        return (
            'call(' +
            stringify(this.gas) +
            ',' +
            stringify(this.address) +
            ',' +
            stringify(this.value) +
            ',' +
            stringify(this.memoryStart) +
            ',' +
            stringify(this.memoryLength) +
            ',' +
            stringify(this.outputStart) +
            ',' +
            stringify(this.outputLength) +
            ')'
        );
    }
}

export default (opcode: Opcode, state: EVM): void => {
    const gas = state.stack.pop();
    const address = state.stack.pop();
    const value = state.stack.pop();
    const memoryStart = state.stack.pop();
    const memoryLength = state.stack.pop();
    const outputStart = state.stack.pop();
    const outputLength = state.stack.pop();
    state.stack.push(
        new CALL(gas, address, value, memoryStart, memoryLength, outputStart, outputLength)
    );
};
