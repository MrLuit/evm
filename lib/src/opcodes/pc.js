"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BigNumber = require("../../node_modules/big-integer");
exports.default = (opcode, state) => {
    state.stack.push(BigNumber(opcode.pc));
};
//# sourceMappingURL=pc.js.map