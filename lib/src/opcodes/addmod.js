"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const add_1 = require("./add");
const mod_1 = require("./mod");
const BigNumber = require("../../node_modules/big-integer");
exports.default = (opcode, state) => {
    const left = state.stack.pop();
    const right = state.stack.pop();
    const mod = state.stack.pop();
    if (BigNumber.isInstance(left) && BigNumber.isInstance(right) && BigNumber.isInstance(mod)) {
        state.stack.push(left.add(right).mod(mod));
    }
    else if (BigNumber.isInstance(left) && BigNumber.isInstance(right)) {
        state.stack.push(new mod_1.MOD(left.add(right), mod));
    }
    else {
        state.stack.push(new mod_1.MOD(new add_1.ADD(left, right), mod));
    }
};
//# sourceMappingURL=addmod.js.map