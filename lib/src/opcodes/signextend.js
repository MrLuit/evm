"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shl_1 = require("./shl");
const sar_1 = require("./sar");
const sub_1 = require("./sub");
const BigNumber = require("../../node_modules/big-integer");
exports.default = (opcode, state) => {
    const left = state.stack.pop();
    const right = state.stack.pop();
    if (BigNumber.isInstance(left) && BigNumber.isInstance(right)) {
        state.stack.push(right.shiftLeft(BigNumber(32).subtract(left)).shiftRight(BigNumber(32).subtract(left)));
    }
    else if (BigNumber.isInstance(left)) {
        state.stack.push(new sar_1.SAR(new shl_1.SHL(right, BigNumber(32).subtract(left)), BigNumber(32).subtract(left)));
    }
    else {
        state.stack.push(new sar_1.SAR(new shl_1.SHL(right, new sub_1.SUB(BigNumber(32), left)), new sub_1.SUB(BigNumber(32), left)));
    }
};
//# sourceMappingURL=signextend.js.map