"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stringify_1 = require("../utils/stringify");
class EXTCODECOPY {
    constructor(address, startLocation, copyLength) {
        this.name = 'EXTCODECOPY';
        this.wrapped = true;
        this.address = address;
        this.startLocation = startLocation;
        this.copyLength = copyLength;
    }
    toString() {
        return ('address(' +
            stringify_1.default(this.address) +
            ').code[' +
            stringify_1.default(this.startLocation) +
            ':(' +
            stringify_1.default(this.startLocation) +
            '+' +
            stringify_1.default(this.copyLength) +
            ')]');
    }
}
exports.EXTCODECOPY = EXTCODECOPY;
exports.default = (opcode, state) => {
    const address = state.stack.pop();
    const memoryLocation = state.stack.pop();
    const startLocation = state.stack.pop();
    const copyLength = state.stack.pop();
    state.memory[memoryLocation] = new EXTCODECOPY(address, startLocation, copyLength);
};
//# sourceMappingURL=extcodecopy.js.map