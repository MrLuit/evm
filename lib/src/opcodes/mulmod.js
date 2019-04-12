"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mul_1 = require("./mul");
const mod_1 = require("./mod");
const BigNumber = require("../../node_modules/big-integer");
exports.default = (opcode, state) => {
    const left = state.stack.pop();
    const right = state.stack.pop();
    const mod = state.stack.pop();
    if (BigNumber.isInstance(left) && BigNumber.isInstance(right) && BigNumber.isInstance(mod)) {
        state.stack.push(left.multiply(right).mod(mod));
    }
    else if (BigNumber.isInstance(left) && BigNumber.isInstance(right)) {
        state.stack.push(new mod_1.MOD(left.multiply(right), mod));
    }
    else {
        state.stack.push(new mod_1.MOD(new mul_1.MUL(left, right), mod));
    }
};
//# sourceMappingURL=mulmod.js.map