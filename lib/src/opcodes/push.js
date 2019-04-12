"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BigNumber = require("../../node_modules/big-integer");
exports.default = (opcode, state) => {
    const pushDataLength = parseInt(opcode.name.replace('PUSH', ''), 10);
    state.stack.push(BigNumber(opcode.pushData.toString('hex'), 16));
};
//# sourceMappingURL=push.js.map