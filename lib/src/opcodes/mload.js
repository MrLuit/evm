"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BigNumber = require("../../node_modules/big-integer");
const stringify_1 = require("../utils/stringify");
class MLOAD {
    constructor(location) {
        this.name = 'MLOAD';
        this.wrapped = true;
        this.location = location;
    }
    toString() {
        return 'memory[' + stringify_1.default(this.location) + ']';
    }
}
exports.MLOAD = MLOAD;
exports.default = (opcode, state) => {
    const memoryLocation = state.stack.pop();
    if (BigNumber.isInstance(memoryLocation) && memoryLocation.toJSNumber() in state.memory) {
        state.stack.push(state.memory[memoryLocation.toJSNumber()]);
    }
    else {
        state.stack.push(new MLOAD(memoryLocation));
    }
};
//# sourceMappingURL=mload.js.map