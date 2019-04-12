"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stringify_1 = require("../utils/stringify");
class CREATE {
    constructor(memoryStart, memoryLength, value) {
        this.name = 'CREATE';
        this.name = 'address';
        this.wrapped = true;
        this.memoryStart = memoryStart;
        this.memoryLength = memoryLength;
        this.value = value;
    }
    toString() {
        return ('(new Contract(memory[' +
            stringify_1.default(this.memoryStart) +
            ':(' +
            stringify_1.default(this.memoryStart) +
            '+' +
            stringify_1.default(this.memoryLength) +
            ')]).value(' +
            stringify_1.default(this.value) +
            ')).address');
    }
}
exports.CREATE = CREATE;
exports.default = (opcode, state) => {
    const value = state.stack.pop();
    const memoryStart = state.stack.pop();
    const memoryLength = state.stack.pop();
    state.stack.push(new CREATE(memoryStart, memoryLength, value));
};
//# sourceMappingURL=create.js.map