import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import Instruction from '../classes/instruction.class';
import stringify from '../utils/stringify';

export class STATICCALL {
    readonly type: string;
    readonly static: boolean;
    readonly gas: any;
    readonly address: any;
    readonly memoryStart: any;
    readonly memoryLength: any;
    readonly outputStart: any;
    readonly outputLength: any;

    constructor(
        gas: any,
        address: any,
        memoryStart: any,
        memoryLength: any,
        outputStart: any,
        outputLength: any
    ) {
        this.type = 'STATICCALL';
        this.static = false;
        this.gas = gas;
        this.address = address;
        this.memoryStart = memoryStart;
        this.memoryLength = memoryLength;
        this.outputStart = outputStart;
        this.outputLength = outputLength;
    }

    toString() {
        return (
            'staticcall(' +
            stringify(this.gas) +
            ',' +
            stringify(this.address) +
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

export default (opcode: Opcode, state: EVM): Instruction => {
    const gas = state.stack.pop();
    const address = state.stack.pop();
    const memoryStart = state.stack.pop();
    const memoryLength = state.stack.pop();
    const outputStart = state.stack.pop();
    const outputLength = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    state.stack.push(
        new STATICCALL(gas, address, memoryStart, memoryLength, outputStart, outputLength)
    );
    return instruction;
};
