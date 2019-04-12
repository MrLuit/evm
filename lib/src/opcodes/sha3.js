"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mload_1 = require("./mload");
const BigNumber = require("../../node_modules/big-integer");
const stringify_1 = require("../utils/stringify");
class SHA3 {
    constructor(items, memoryStart, memoryLength) {
        this.name = 'SHA3';
        this.wrapped = false;
        if (memoryStart && memoryLength) {
            this.memoryStart = memoryStart;
            this.memoryLength = memoryLength;
        }
        else {
            this.items = items;
        }
    }
    toString() {
        if (this.items) {
            return 'keccak256(' + this.items.map((item) => stringify_1.default(item)).join(', ') + ')';
        }
        else {
            return ('keccak256(memory[' +
                stringify_1.default(this.memoryStart) +
                ':(' +
                stringify_1.default(this.memoryStart) +
                '+' +
                stringify_1.default(this.memoryLength) +
                ')])');
        }
    }
}
exports.SHA3 = SHA3;
exports.default = (opcode, state) => {
    const memoryStart = state.stack.pop();
    const memoryLength = state.stack.pop();
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
        state.stack.push(new SHA3(items));
    }
    else {
        state.stack.push(new SHA3([], memoryStart, memoryLength));
    }
};
//# sourceMappingURL=sha3.js.map