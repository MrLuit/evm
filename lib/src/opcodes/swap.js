"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (opcode, state) => {
    const swapLocation = parseInt(opcode.name.replace('SWAP', ''), 10);
    state.stack.swap(swapLocation);
};
//# sourceMappingURL=swap.js.map