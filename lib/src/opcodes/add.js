"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BigNumber = require("../../node_modules/big-integer");
const stringify_1 = require("../utils/stringify");
class ADD {
    constructor(left, right) {
        this.name = 'ADD';
        this.wrapped = true;
        this.left = left;
        this.right = right;
    }
    toString() {
        return stringify_1.default(this.left) + ' + ' + stringify_1.default(this.right);
    }
    get type() {
        if (this.left.type === this.right.type) {
            return this.left.type;
        }
        else if (!this.left.type && this.right.type) {
            return this.right.type;
        }
        else if (!this.right.type && this.left.type) {
            return this.left.type;
        }
        else {
            return false;
        }
    }
}
exports.ADD = ADD;
exports.default = (opcode, state) => {
    const left = state.stack.pop();
    const right = state.stack.pop();
    if (BigNumber.isInstance(left) && BigNumber.isInstance(right)) {
        state.stack.push(left.add(right));
    }
    else if (BigNumber.isInstance(left) && left.isZero()) {
        state.stack.push(right);
    }
    else if (BigNumber.isInstance(right) && right.isZero()) {
        state.stack.push(left);
    }
    else {
        state.stack.push(new ADD(left, right));
    }
};
//# sourceMappingURL=add.js.map