"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (opcode, state) => {
    const duplicateLocation = parseInt(opcode.name.replace('DUP', ''), 10) - 1;
    state.stack.duplicate(duplicateLocation);
};
//# sourceMappingURL=dup.js.map