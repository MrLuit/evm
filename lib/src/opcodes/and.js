"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BigNumber = require("../../node_modules/big-integer");
const stringify_1 = require("../utils/stringify");
class AND {
    constructor(left, right) {
        this.name = 'AND';
        this.wrapped = true;
        this.left = left;
        this.right = right;
    }
    toString() {
        return stringify_1.default(this.left) + ' && ' + stringify_1.default(this.right);
    }
}
exports.AND = AND;
exports.default = (opcode, state) => {
    const left = state.stack.pop();
    const right = state.stack.pop();
    if (BigNumber.isInstance(left) && BigNumber.isInstance(right)) {
        state.stack.push(left.and(right));
    }
    else if (BigNumber.isInstance(left) && /^[f]+$/.test(left.toString(16))) {
        right.size = left.toString(16).length;
        state.stack.push(right);
    }
    else if (BigNumber.isInstance(right) && /^[f]+$/.test(right.toString(16))) {
        left.size = right.toString(16).length;
        state.stack.push(left);
        /*} else if (
        BigNumber.isInstance(left) &&
        left.equals('1461501637330902918203684832716283019655932542975')
    ) {*/
        /* 2 ** 160 */
        /*    state.stack.push(right);
    } else if (
        BigNumber.isInstance(right) &&
        right.equals('1461501637330902918203684832716283019655932542975')
    ) {*/
        /* 2 ** 160 */
        /*    state.stack.push(left);*/
    }
    else if (BigNumber.isInstance(left) &&
        right instanceof AND &&
        BigNumber.isInstance(right.left) &&
        left.equals(right.left)) {
        state.stack.push(right.right);
    }
    else {
        state.stack.push(new AND(left, right));
    }
};
//# sourceMappingURL=and.js.map