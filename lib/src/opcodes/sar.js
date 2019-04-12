"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BigNumber = require("../../node_modules/big-integer");
const stringify_1 = require("../utils/stringify");
class SAR {
    constructor(left, right) {
        this.name = 'SAR';
        this.wrapped = true;
        this.left = left;
        this.right = right;
    }
    toString() {
        return stringify_1.default(this.left) + ' >> ' + stringify_1.default(this.right);
    }
}
exports.SAR = SAR;
exports.default = (opcode, state) => {
    const left = state.stack.pop();
    const right = state.stack.pop();
    if (BigNumber.isInstance(left) && BigNumber.isInstance(right)) {
        state.stack.push(left.shiftRight(right));
    }
    else {
        state.stack.push(new SAR(left, right));
    }
};
//# sourceMappingURL=sar.js.map