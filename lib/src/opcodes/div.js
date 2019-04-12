"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BigNumber = require("../../node_modules/big-integer");
const stringify_1 = require("../utils/stringify");
class DIV {
    constructor(left, right) {
        this.name = 'DIV';
        this.wrapped = true;
        this.left = left;
        this.right = right;
    }
    toString() {
        return stringify_1.default(this.left) + ' / ' + stringify_1.default(this.right);
    }
}
exports.DIV = DIV;
exports.default = (opcode, state) => {
    const left = state.stack.pop();
    const right = state.stack.pop();
    if (BigNumber.isInstance(left) && BigNumber.isInstance(right)) {
        state.stack.push(left.divide(right));
    }
    else if (BigNumber.isInstance(right) && right.equals(1)) {
        state.stack.push(left);
    }
    else {
        state.stack.push(new DIV(left, right));
    }
};
//# sourceMappingURL=div.js.map