"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stringify_1 = require("../utils/stringify");
class CODECOPY {
    constructor(startLocation, copyLength) {
        this.name = 'CODECOPY';
        this.wrapped = true;
        this.startLocation = startLocation;
        this.copyLength = copyLength;
    }
    toString() {
        return ('this.code[' +
            stringify_1.default(this.startLocation) +
            ':(' +
            stringify_1.default(this.startLocation) +
            '+' +
            stringify_1.default(this.copyLength) +
            ')]');
    }
}
exports.CODECOPY = CODECOPY;
exports.default = (opcode, state) => {
    const memoryLocation = state.stack.pop();
    const startLocation = state.stack.pop();
    const copyLength = state.stack.pop();
    state.memory[memoryLocation] = new CODECOPY(startLocation, copyLength);
};
//# sourceMappingURL=codecopy.js.map