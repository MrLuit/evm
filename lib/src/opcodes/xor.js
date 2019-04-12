"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BigNumber = require("../../node_modules/big-integer");
const stringify_1 = require("../utils/stringify");
class XOR {
    constructor(left, right) {
        this.name = 'XOR';
        this.wrapped = true;
        this.left = left;
        this.right = right;
    }
    toString() {
        return stringify_1.default(this.left) + ' ^ ' + stringify_1.default(this.right);
    }
}
exports.XOR = XOR;
exports.default = (opcode, state) => {
    const left = state.stack.pop();
    const right = state.stack.pop();
    if (BigNumber.isInstance(left) && BigNumber.isInstance(right)) {
        state.stack.push(left.xor(right));
    }
    else {
        state.stack.push(new XOR(left, right));
    }
};
//# sourceMappingURL=xor.js.map