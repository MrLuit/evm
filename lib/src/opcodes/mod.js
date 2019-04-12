"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BigNumber = require("../../node_modules/big-integer");
const stringify_1 = require("../utils/stringify");
class MOD {
    constructor(left, right) {
        this.name = 'MOD';
        this.wrapped = true;
        this.left = left;
        this.right = right;
    }
    toString() {
        return stringify_1.default(this.left) + ' % ' + stringify_1.default(this.right);
    }
}
exports.MOD = MOD;
exports.default = (opcode, state) => {
    const left = state.stack.pop();
    const right = state.stack.pop();
    if (BigNumber.isInstance(left) && BigNumber.isInstance(right)) {
        state.stack.push(left.mod(right));
    }
    else {
        state.stack.push(new MOD(left, right));
    }
};
//# sourceMappingURL=mod.js.map