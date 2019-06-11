import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import Instruction from '../classes/instruction.class';
import * as BigNumber from '../../node_modules/big-integer';
import stringify from '../utils/stringify';

export class ISZERO {
    readonly type: string;
    readonly static: boolean;
    readonly item: any;

    constructor(item: any) {
        this.type = 'ISZERO';
        this.static = false;
        this.item = item;
    }

    toString() {
        return stringify(this.item) + ' == 0';
    }
}

export default (opcode: Opcode, state: EVM): Instruction => {
    const item = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    if (BigNumber.isInstance(item)) {
        state.stack.push(BigNumber(item.isZero() === true ? 1 : 0));
    } else if (item instanceof ISZERO) {
        state.stack.push(item.item);
    } else {
        state.stack.push(new ISZERO(item));
    }
    /* == -> != */
    /* != -> == */
    /* > -> <= */
    /* <= -> > */
    /* < -> >= */
    /* >= -> < */
    return instruction;
};
