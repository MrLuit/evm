"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mload_1 = require("./mload");
const BigNumber = require("../../node_modules/big-integer");
const stringify_1 = require("../utils/stringify");
class REVERT {
    constructor(items, memoryStart, memoryLength) {
        this.name = 'REVERT';
        this.wrapped = true;
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
            return 'revert(' + this.items.map((item) => stringify_1.default(item)).join(', ') + ');';
        }
        else {
            return ('revert(memory[' +
                stringify_1.default(this.memoryStart) +
                ':(' +
                stringify_1.default(this.memoryStart) +
                '+' +
                stringify_1.default(this.memoryLength) +
                ')]);');
        }
    }
}
exports.REVERT = REVERT;
exports.default = (opcode, state) => {
    const memoryStart = state.stack.pop();
    const memoryLength = state.stack.pop();
    state.halted = true;
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
        state.instructions.push(new REVERT(items));
    }
    else {
        state.instructions.push(new REVERT([], memoryStart, memoryLength));
    }
};
//# sourceMappingURL=revert.js.map