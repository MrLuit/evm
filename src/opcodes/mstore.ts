import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import Instruction from '../classes/instruction.class';
import * as BigNumber from '../../node_modules/big-integer';
import stringify from '../utils/stringify';

export class MSTORE {
    readonly type: string;
    readonly static: boolean;
    readonly location: any;
    readonly data: any;

    constructor(location: any, data: any) {
        this.type = 'MSTORE';
        this.static = false;
        this.location = location;
        this.data = data;
    }

    toString() {
        return 'memory[' + stringify(this.location) + '] = ' + stringify(this.data) + ';';
    }
}

export default (opcode: Opcode, state: EVM): Instruction => {
    const storeLocation = state.stack.pop();
    const storeData = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    if (BigNumber.isInstance(storeLocation)) {
        state.memory[storeLocation.toJSNumber()] = storeData;
    } else {
        state.instructions.push(new MSTORE(storeLocation, storeData));
    }
    return instruction;
};
