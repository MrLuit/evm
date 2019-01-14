import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import { MLOAD } from './mload';
import * as BigNumber from '../../node_modules/big-integer';
import stringify from '../utils/stringify';

export class SHA3 {
    readonly name: string;
    readonly type?: string;
    readonly wrapped: boolean;
    readonly memoryStart?: any;
    readonly memoryLength?: any;
    readonly items: any;

    constructor(items: any, memoryStart?: any, memoryLength?: any) {
        this.name = 'SHA3';
        this.wrapped = false;
        if (memoryStart && memoryLength) {
            this.memoryStart = memoryStart;
            this.memoryLength = memoryLength;
        } else {
            this.items = items;
        }
    }

    toString() {
        if (this.items) {
            return 'keccak256(' + this.items.map((item: any) => stringify(item)).join(', ') + ')';
        } else {
            return (
                'keccak256(memory[' +
                stringify(this.memoryStart) +
                ':(' +
                stringify(this.memoryStart) +
                '+' +
                stringify(this.memoryLength) +
                ')])'
            );
        }
    }
}

export default (opcode: Opcode, state: EVM): void => {
    const memoryStart = state.stack.pop();
    const memoryLength = state.stack.pop();
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
};
