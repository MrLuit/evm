import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import Instruction from '../classes/instruction.class';
import * as BigNumber from '../../node_modules/big-integer';
import stringify from '../utils/stringify';

export class BYTE {
    readonly type: string;
    readonly static: boolean;
    readonly position: any;
    readonly data: any;

    constructor(position: any, data: any) {
        this.type = 'BYTE';
        this.static = false;
        this.position = position;
        this.data = data;
    }

    toString() {
        return '(' + stringify(this.data) + ' >> ' + stringify(this.position) + ') & 1';
    }
}

export default (opcode: Opcode, state: EVM): Instruction => {
    const position = state.stack.pop();
    const data = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    if (BigNumber.isInstance(data) && BigNumber.isInstance(position)) {
        state.stack.push(data.shiftRight(position).and(1));
    } else {
        state.stack.push(new BYTE(position, data));
    }
    return instruction;
};
