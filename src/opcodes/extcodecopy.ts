import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import Instruction from '../classes/instruction.class';
import stringify from '../utils/stringify';

export class EXTCODECOPY {
    readonly type: string;
    readonly static: boolean;
    readonly address: any;
    readonly startLocation: any;
    readonly copyLength: any;

    constructor(address: any, startLocation: any, copyLength: any) {
        this.type = 'EXTCODECOPY';
        this.static = false;
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

export default (opcode: Opcode, state: EVM): Instruction => {
    const address = state.stack.pop();
    const memoryLocation = state.stack.pop();
    const startLocation = state.stack.pop();
    const copyLength = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    state.memory[memoryLocation] = new EXTCODECOPY(address, startLocation, copyLength);
    return instruction;
};
