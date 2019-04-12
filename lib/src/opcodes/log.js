"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mload_1 = require("./mload");
const eventHashes = require("../../data/eventHashes.json");
const BigNumber = require("../../node_modules/big-integer");
class LOG {
    constructor(topics, items, memoryStart, memoryLength) {
        this.name = 'LOG';
        this.wrapped = true;
        this.topics = topics;
        if (this.topics.length > 0 &&
            BigNumber.isInstance(this.topics[0]) &&
            this.topics[0].toString(16) in eventHashes) {
            this.eventName = eventHashes[this.topics[0].toString(16)].split('(')[0];
            this.topics.shift();
        }
        if (this.memoryStart && this.memoryLength) {
            this.memoryStart = memoryStart;
            this.memoryLength = memoryLength;
        }
        else {
            this.items = items;
        }
    }
    toString() {
        if (this.eventName) {
            return ('emit ' + this.eventName + '(' + [...this.topics, ...this.items].join(', ') + ');');
        }
        else {
            return 'log(' + [...this.topics, ...this.items].join(', ') + ');';
        }
    }
}
exports.LOG = LOG;
exports.default = (opcode, state) => {
    const topicsCount = parseInt(opcode.name.replace('LOG', ''), 10);
    const memoryStart = state.stack.pop();
    const memoryLength = state.stack.pop();
    const topics = [];
    for (let i = 0; i < topicsCount; i++) {
        topics.push(state.stack.pop());
    }
    if (topics.length > 0) {
        const eventTopic = topics[0].toString(16);
        if (!(eventTopic in state.events)) {
            state.events[eventTopic] = {};
            state.events[eventTopic].indexedCount = topics.length - 1;
            if (eventTopic in eventHashes) {
                state.events[eventTopic].label = eventHashes[eventTopic];
            }
        }
    }
    if (BigNumber.isInstance(memoryStart) && BigNumber.isInstance(memoryLength)) {
        const items = [];
        for (let i = memoryStart.toJSNumber(); i < memoryStart.add(memoryLength).toJSNumber(); i += 32) {
            if (i in state.memory) {
                items.push(state.memory[i]);
            }
            else {
                items.push(new mload_1.MLOAD(i));
            }
        }
        if (topics.length === 0) {
            if (!('anonymous' in state.events)) {
                state.events.anonymous = [];
            }
            state.events.anonymous.push({ items });
        }
        state.instructions.push(new LOG(topics, items));
    }
    else {
        state.instructions.push(new LOG(topics, [], memoryStart, memoryLength));
    }
};
//# sourceMappingURL=log.js.map