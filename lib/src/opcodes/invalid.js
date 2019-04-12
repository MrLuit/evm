"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class INVALID {
    constructor(opcode) {
        this.name = 'INVALID';
        this.wrapped = true;
        this.opcode = opcode;
    }
    toString() {
        return 'revert("Invalid instruction (0x' + this.opcode.toString(16) + ')");';
    }
}
exports.INVALID = INVALID;
exports.default = (opcode, state) => {
    state.halted = true;
    state.instructions.push(new INVALID(opcode.opcode));
};
//# sourceMappingURL=invalid.js.map