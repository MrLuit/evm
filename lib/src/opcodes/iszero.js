"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BigNumber = require("../../node_modules/big-integer");
const lt_1 = require("./lt");
const gt_1 = require("./gt");
const stringify_1 = require("../utils/stringify");
class ISZERO {
    constructor(item) {
        this.name = 'ISZERO';
        this.wrapped = true;
        this.item = item;
    }
    toString() {
        if (this.item.name === 'EQ') {
            return stringify_1.default(this.item.left) + ' != ' + stringify_1.default(this.item.right);
        }
        else {
            return stringify_1.default(this.item) + ' == 0';
        }
    }
}
exports.ISZERO = ISZERO;
exports.default = (opcode, state) => {
    const item = state.stack.pop();
    if (BigNumber.isInstance(item)) {
        state.stack.push(BigNumber(item.isZero() === true ? 1 : 0));
    }
    else if (item.name === 'LT') {
        if (item.equal) {
            state.stack.push(new gt_1.GT(item.left, item.right));
        }
        else {
            state.stack.push(new gt_1.GT(item.left, item.right, true));
        }
    }
    else if (item.name === 'GT') {
        if (item.equal) {
            state.stack.push(new lt_1.LT(item.left, item.right));
        }
        else {
            state.stack.push(new lt_1.LT(item.left, item.right, true));
        }
    }
    else if (item instanceof ISZERO) {
        state.stack.push(item.item);
    }
    else {
        state.stack.push(new ISZERO(item));
    }
};
//# sourceMappingURL=iszero.js.map