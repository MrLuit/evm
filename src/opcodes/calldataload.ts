import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import Instruction from '../classes/instruction.class';
import * as BigNumber from '../../node_modules/big-integer';
import stringify from '../utils/stringify';

export class CALLDATALOAD {
    readonly type: string;
    readonly static: boolean;
    readonly location: any;

    constructor(location: any) {
        this.type = 'CALLDATALOAD';
        if (
            BigNumber.isInstance(this.location) &&
            this.location
                .subtract(4)
                .mod(32)
                .isZero()
        ) {
            this.static = true;
        } else {
            this.static = false;
        }
        this.location = location;
    }

    toString() {
        if (BigNumber.isInstance(this.location) && this.location.isZero()) {
            return 'msg.data';
        } else if (
            BigNumber.isInstance(this.location) &&
            this.location
                .subtract(4)
                .mod(32)
                .isZero()
        ) {
            return (
                '_arg' +
                this.location
                    .subtract(4)
                    .divide(32)
                    .toString()
            );
        } else {
            return 'msg.data[' + stringify(this.location) + ']';
        }
    }
}

export default (opcode: Opcode, state: EVM): Instruction => {
    const startLocation = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    state.stack.push(new CALLDATALOAD(startLocation));
    return instruction;
};
