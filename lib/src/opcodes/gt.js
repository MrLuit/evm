"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BigNumber = require("../../node_modules/big-integer");
const stringify_1 = require("../utils/stringify");
class GT {
    constructor(left, right, equal = false) {
        this.name = 'GT';
        this.wrapped = true;
        this.left = left;
        this.right = right;
        this.equal = equal;
    }
    toString() {
        if (this.equal) {
            return stringify_1.default(this.left) + ' >= ' + stringify_1.default(this.right);
        }
        else {
            return stringify_1.default(this.left) + ' > ' + stringify_1.default(this.right);
        }
    }
}
exports.GT = GT;
exports.default = (opcode, state) => {
    const left = state.stack.pop();
    const right = state.stack.pop();
    if (BigNumber.isInstance(left) && BigNumber.isInstance(right)) {
        state.stack.push(BigNumber(left.greater(right) === true ? 1 : 0));
    }
    else {
        state.stack.push(new GT(left, right));
    }
};
//# sourceMappingURL=gt.js.map