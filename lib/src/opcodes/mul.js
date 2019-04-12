"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BigNumber = require("../../node_modules/big-integer");
const stringify_1 = require("../utils/stringify");
class MUL {
    constructor(left, right) {
        this.name = 'MUL';
        this.wrapped = true;
        this.left = left;
        this.right = right;
    }
    toString() {
        return stringify_1.default(this.left) + ' * ' + stringify_1.default(this.right);
    }
}
exports.MUL = MUL;
exports.default = (opcode, state) => {
    const left = state.stack.pop();
    const right = state.stack.pop();
    if (BigNumber.isInstance(left) && BigNumber.isInstance(right)) {
        state.stack.push(left.multiply(right));
    }
    else if ((BigNumber.isInstance(left) && left.isZero()) ||
        (BigNumber.isInstance(right) && right.isZero())) {
        state.stack.push(BigNumber(0));
    }
    else {
        state.stack.push(new MUL(left, right));
    }
};
//# sourceMappingURL=mul.js.map