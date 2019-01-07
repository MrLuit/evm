import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import Instruction from '../classes/instruction.class';
import { MLOAD } from './mload';
import * as BigNumber from '../../node_modules/big-integer';
import stringify from '../utils/stringify';

export class SHA3 {
    readonly type: string;
    readonly static: boolean;
    readonly memoryStart?: any;
    readonly memoryLength?: any;
    readonly items: any;

    constructor(items: any, memoryStart?: any, memoryLength?: any) {
        this.type = 'SHA3';
        this.static = true;
        if (memoryStart && memoryLength) {
            this.memoryStart = memoryStart;
            this.memoryLength = memoryLength;
        } else {
            this.items = items;
        }
    }

    toString() {
        return 'keccak256(' + this.items.map((item: any) => stringify(item)).join(', ') + ')';
    }
}

export default (opcode: Opcode, state: EVM): Instruction => {
    const memoryStart = state.stack.pop();
    const memoryLength = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    if (BigNumber.isInstance(memoryStart) && BigNumber.isInstance(memoryLength)) {
        const items = [];
        for (
            let i = memoryStart.toJSNumber();
            i < memoryStart.add(memoryLength).toJSNumber();
            i += 32
        ) {
            if (i in state.memory) {
                items.push(state.memory[i]);
            } else {
                items.push(new MLOAD(i));
            }
        }
        state.stack.push(new SHA3(items));
    } else {
        state.stack.push(new SHA3([], memoryStart, memoryLength));
    }
    return instruction;
};
