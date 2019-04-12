"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BigNumber = require("../../node_modules/big-integer");
const stringify_1 = require("../utils/stringify");
class CALL {
    constructor(gas, address, value, memoryStart, memoryLength, outputStart, outputLength) {
        this.name = 'CALL';
        this.wrapped = false;
        this.gas = gas;
        this.address = address;
        this.value = value;
        this.memoryStart = memoryStart;
        this.memoryLength = memoryLength;
        this.outputStart = outputStart;
        this.outputLength = outputLength;
        this.throwOnFail = false;
    }
    toString() {
        if (BigNumber.isInstance(this.memoryLength) &&
            this.memoryLength.isZero() &&
            BigNumber.isInstance(this.outputLength) &&
            this.outputLength.isZero()) {
            if (this.gas.name === 'MUL' &&
                this.gas.left.name === 'ISZERO' &&
                BigNumber.isInstance(this.gas.right) &&
                this.gas.right.equals(2300)) {
                if (this.throwOnFail) {
                    return ('address(' +
                        stringify_1.default(this.address) +
                        ').transfer(' +
                        stringify_1.default(this.value) +
                        ')');
                }
                else {
                    return ('address(' +
                        stringify_1.default(this.address) +
                        ').send(' +
                        stringify_1.default(this.value) +
                        ')');
                }
            }
            else {
                return ('address(' +
                    stringify_1.default(this.address) +
                    ').call.gas(' +
                    stringify_1.default(this.gas) +
                    ').value(' +
                    stringify_1.default(this.value) +
                    ')');
            }
        }
        else {
            return ('call(' +
                stringify_1.default(this.gas) +
                ',' +
                stringify_1.default(this.address) +
                ',' +
                stringify_1.default(this.value) +
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
}
exports.CALL = CALL;
exports.default = (opcode, state) => {
    const gas = state.stack.pop();
    const address = state.stack.pop();
    const value = state.stack.pop();
    const memoryStart = state.stack.pop();
    const memoryLength = state.stack.pop();
    const outputStart = state.stack.pop();
    const outputLength = state.stack.pop();
    state.stack.push(new CALL(gas, address, value, memoryStart, memoryLength, outputStart, outputLength));
    state.memory[outputStart] = 'output';
};
//# sourceMappingURL=call.js.map