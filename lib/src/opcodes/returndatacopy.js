"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stringify_1 = require("../utils/stringify");
class RETURNDATACOPY {
    constructor(returnDataPosition, returnDataSize) {
        this.name = 'RETURNDATACOPY';
        this.wrapped = true;
        this.returnDataPosition = returnDataPosition;
        this.returnDataSize = returnDataSize;
    }
    toString() {
        return ('output[' +
            stringify_1.default(this.returnDataPosition) +
            ':(' +
            stringify_1.default(this.returnDataPosition) +
            '+' +
            stringify_1.default(this.returnDataSize) +
            ')]');
    }
}
exports.RETURNDATACOPY = RETURNDATACOPY;
exports.default = (opcode, state) => {
    const memoryPosition = state.stack.pop();
    const returnDataPosition = state.stack.pop();
    const returnDataSize = state.stack.pop();
    state.memory[memoryPosition] = new RETURNDATACOPY(returnDataPosition, returnDataSize);
};
//# sourceMappingURL=returndatacopy.js.map