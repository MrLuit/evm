import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import Instruction from '../classes/instruction.class';
import * as BigNumber from '../../node_modules/big-integer';
import stringify from '../utils/stringify';

export class JUMP {
    readonly type: string;
    readonly static: boolean;
    readonly valid: boolean;
    readonly location: any;

    constructor(location: any, bad?: boolean) {
        this.type = 'JUMP';
        this.static = true;
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

export default (opcode: Opcode, state: EVM): Instruction => {
    const jumpLocation = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    instruction.setDescription('goto(%s);', jumpLocation);
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
    return instruction;
};
