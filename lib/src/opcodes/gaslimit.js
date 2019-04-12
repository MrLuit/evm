"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GASLIMIT {
    constructor() {
        this.name = 'GASLIMIT';
        this.wrapped = false;
    }
    toString() {
        return 'block.gaslimit';
    }
}
exports.GASLIMIT = GASLIMIT;
exports.default = (opcode, state) => {
    state.stack.push(new GASLIMIT());
};
//# sourceMappingURL=gaslimit.js.map