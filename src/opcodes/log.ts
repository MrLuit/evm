import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import { MLOAD } from './mload';
import * as eventHashes from '../../data/eventHashes.json';
import * as BigNumber from '../../node_modules/big-integer';

export class LOG {
    readonly name: string;
    readonly type?: string;
    readonly wrapped: boolean;
    readonly memoryStart?: any;
    readonly memoryLength?: any;
    readonly items?: any;
    readonly topics: any;
    readonly eventName?: string;

    constructor(topics: any, items?: any, memoryStart?: any, memoryLength?: any) {
        this.name = 'LOG';
        this.wrapped = true;
        this.topics = topics;
        if (
            this.topics.length > 0 &&
            BigNumber.isInstance(this.topics[0]) &&
            this.topics[0].toString(16) in eventHashes
        ) {
            this.eventName = (eventHashes as any)[this.topics[0].toString(16)].split('(')[0];
            this.topics.shift();
        }
        if (this.memoryStart && this.memoryLength) {
            this.memoryStart = memoryStart;
            this.memoryLength = memoryLength;
        } else {
            this.items = items;
        }
    }

    toString() {
        if (this.eventName) {
            return (
                'emit ' + this.eventName + '(' + [...this.topics, ...this.items].join(', ') + ')'
            );
        } else {
            return 'log(' + [...this.topics, ...this.items].join(', ') + ')';
        }
    }
}

export default (opcode: Opcode, state: EVM): void => {
    const topicsCount = parseInt(opcode.name.replace('LOG', ''), 10);
    const memoryStart = state.stack.pop();
    const memoryLength = state.stack.pop();
    const topics = [];
    for (let i = 0; i < topicsCount; i++) {
        topics.push(state.stack.pop());
    }
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
        state.instructions.push(new LOG(topics, items));
    } else {
        state.instructions.push(new LOG(topics, [], memoryStart, memoryLength));
    }
};
