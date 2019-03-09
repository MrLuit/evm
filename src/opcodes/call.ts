import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import * as BigNumber from '../../node_modules/big-integer';
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
    readonly throwOnFail: boolean;

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
        this.throwOnFail = false;
    }

    toString() {
        if (
            BigNumber.isInstance(this.memoryLength) &&
            this.memoryLength.isZero() &&
            BigNumber.isInstance(this.outputLength) &&
            this.outputLength.isZero()
        ) {
            if (
                this.gas.name === 'MUL' &&
                this.gas.left.name === 'ISZERO' &&
                BigNumber.isInstance(this.gas.right) &&
                this.gas.right.equals(2300)
            ) {
                if (this.throwOnFail) {
                    return (
                        'address(' +
                        stringify(this.address) +
                        ').transfer(' +
                        stringify(this.value) +
                        ')'
                    );
                } else {
                    return (
                        'address(' +
                        stringify(this.address) +
                        ').send(' +
                        stringify(this.value) +
                        ')'
                    );
                }
            } else {
                return (
                    'address(' +
                    stringify(this.address) +
                    ').call.gas(' +
                    stringify(this.gas) +
                    ').value(' +
                    stringify(this.value) +
                    ')'
                );
            }
        } else {
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
    state.memory[outputStart] = 'output';
};
