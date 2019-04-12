"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BigNumber = require("../../node_modules/big-integer");
const stringify_1 = require("../utils/stringify");
class SIG {
    constructor(hash) {
        this.name = 'SIG';
        this.wrapped = false;
        this.hash = hash;
    }
    toString() {
        return 'msg.sig == ' + this.hash;
    }
}
exports.SIG = SIG;
class EQ {
    constructor(left, right) {
        this.name = 'EQ';
        this.wrapped = true;
        this.left = left;
        this.right = right;
    }
    toString() {
        return stringify_1.default(this.left) + ' == ' + stringify_1.default(this.right);
    }
}
exports.EQ = EQ;
exports.default = (opcode, state) => {
    let left = state.stack.pop();
    let right = state.stack.pop();
    if (BigNumber.isInstance(left) && BigNumber.isInstance(right)) {
        state.stack.push(BigNumber(left.equals(right) === true ? 1 : 0));
    }
    else {
        if (BigNumber.isInstance(left) &&
            right.name === 'DIV' &&
            BigNumber.isInstance(right.right)) {
            left = left.multiply(right.right);
            right = right.left;
        }
        if (BigNumber.isInstance(right) &&
            left.name === 'DIV' &&
            BigNumber.isInstance(left.right)) {
            right = right.multiply(left.right);
            left = left.left;
        }
        if (BigNumber.isInstance(left) &&
            /^[0]+$/.test(left.toString(16).substring(8)) &&
            right.name === 'CALLDATALOAD' &&
            right.location.equals(0)) {
            state.stack.push(new SIG('0'.repeat(64 - left.toString(16).length) +
                left.toString(16).substring(0, 8 - (64 - left.toString(16).length))));
        }
        else if (BigNumber.isInstance(right) &&
            /^[0]+$/.test(right.toString(16).substring(8)) &&
            left.name === 'CALLDATALOAD' &&
            left.location.equals(0)) {
            state.stack.push(new SIG('0'.repeat(64 - right.toString(16).length) +
                right.toString(16).substring(0, 8 - (64 - right.toString(16).length))));
        }
        else {
            state.stack.push(new EQ(left, right));
        }
    }
};
//# sourceMappingURL=eq.js.map