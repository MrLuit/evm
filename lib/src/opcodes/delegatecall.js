"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stringify_1 = require("../utils/stringify");
class DELEGATECALL {
    constructor(gas, address, memoryStart, memoryLength, outputStart, outputLength) {
        this.name = 'DELEGATECALL';
        this.wrapped = true;
        this.gas = gas;
        this.address = address;
        this.memoryStart = memoryStart;
        this.memoryLength = memoryLength;
        this.outputStart = outputStart;
        this.outputLength = outputLength;
    }
    toString() {
        return ('delegatecall(' +
            stringify_1.default(this.gas) +
            ',' +
            stringify_1.default(this.address) +
            ',' +
            stringify_1.default(this.memoryStart) +
            ',' +
            stringify_1.default(this.memoryLength) +
            ',' +
            stringify_1.default(this.outputStart) +
            ',' +
            stringify_1.default(this.outputLength) +
            ')');
    }
}
exports.DELEGATECALL = DELEGATECALL;
exports.default = (opcode, state) => {
    const gas = state.stack.pop();
    const address = state.stack.pop();
    const memoryStart = state.stack.pop();
    const memoryLength = state.stack.pop();
    const outputStart = state.stack.pop();
    const outputLength = state.stack.pop();
    state.stack.push(new DELEGATECALL(gas, address, memoryStart, memoryLength, outputStart, outputLength));
};
//# sourceMappingURL=delegatecall.js.map