"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mload_1 = require("./mload");
const hex_1 = require("../utils/hex");
const BigNumber = require("../../node_modules/big-integer");
const stringify_1 = require("../utils/stringify");
class RETURN {
    constructor(items, memoryStart, memoryLength) {
        this.name = 'RETURN';
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
        if (this.memoryStart && this.memoryLength) {
            return ('return memory[' +
                stringify_1.default(this.memoryStart) +
                ':(' +
                stringify_1.default(this.memoryStart) +
                '+' +
                stringify_1.default(this.memoryLength) +
                ')];');
        }
        else if (this.items.length === 0) {
            return 'return;';
        }
        else if (this.items.length === 1 &&
            (BigNumber.isInstance(this.items[0]) || this.items[0].static)) {
            return 'return ' + this.items[0] + ';';
        }
        else if (this.items.length === 3 &&
            this.items.every((item) => BigNumber.isInstance(item)) &&
            this.items[0].equals(32)) {
            return 'return "' + hex_1.hex2a(this.items[2].toString(16)) + '";';
        }
        else {
            return 'return(' + this.items.map((item) => stringify_1.default(item)).join(', ') + ');';
        }
    }
}
exports.RETURN = RETURN;
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
        state.instructions.push(new RETURN(items));
    }
    else {
        state.instructions.push(new RETURN([], memoryStart, memoryLength));
    }
};
//# sourceMappingURL=return.js.map