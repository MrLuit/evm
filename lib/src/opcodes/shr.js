"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BigNumber = require("../../node_modules/big-integer");
const stringify_1 = require("../utils/stringify");
class SHR {
    constructor(left, right) {
        this.name = 'SHR';
        this.wrapped = true;
        this.left = left;
        this.right = right;
    }
    toString() {
        return stringify_1.default(this.left) + ' >>> ' + stringify_1.default(this.right);
    }
}
exports.SHR = SHR;
exports.default = (opcode, state) => {
    const left = state.stack.pop();
    const right = state.stack.pop();
    if (BigNumber.isInstance(left) && BigNumber.isInstance(right)) {
        state.stack.push(left.shiftRight(right));
    }
    else {
        state.stack.push(new SHR(left, right));
    }
};
//# sourceMappingURL=shr.js.map