import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import * as BigNumber from '../../node_modules/big-integer';
import stringify from '../utils/stringify';

export class JUMP {
    readonly name: string;
    readonly type?: string;
    readonly wrapped: boolean;
    readonly valid: boolean;
    readonly location: any;

    constructor(location: any, bad?: boolean) {
        this.name = 'JUMP';
        this.wrapped = true;
        this.location = location;
        this.valid = true;
        if (bad) {
            this.valid = false;
        }
    }

    toString() {
        if (!this.valid) {
            return "revert(\"Bad jump destination\");";
        } else {
            return 'goto(' + stringify(this.location) + ');';
        }
    }
}

export default (opcode: Opcode, state: EVM): void => {
    const jumpLocation = state.stack.pop();
    if (!BigNumber.isInstance(jumpLocation)) {
        state.halted = true;
        state.instructions.push(new JUMP(jumpLocation, true));
    } else {
        const opcodes = state.getOpcodes();
        const jumpLocationData = opcodes.find((o: any) => o.pc === jumpLocation.toJSNumber());
        if (!jumpLocationData) {
            state.halted = true;
            state.instructions.push(new JUMP(jumpLocation, true));
        } else {
            const jumpIndex = opcodes.indexOf(jumpLocationData);
            if (!(opcode.pc + ':' + jumpLocation.toJSNumber() in state.jumps)) {
                state.jumps[opcode.pc + ':' + jumpLocation.toJSNumber()] = true;
                if (!jumpLocationData || jumpLocationData.name !== 'JUMPDEST') {
                    state.halted = true;
                    state.instructions.push(new JUMP(jumpLocation, true));
                } else if (
                    jumpLocationData &&
                    jumpIndex >= 0 &&
                    jumpLocationData.name === 'JUMPDEST'
                ) {
                    state.pc = jumpIndex - 1;
                }
            }
        }
    }
};
