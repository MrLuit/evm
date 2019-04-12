"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ORIGIN {
    constructor() {
        this.name = 'ORIGIN';
        this.wrapped = false;
    }
    toString() {
        return 'tx.origin';
    }
}
exports.ORIGIN = ORIGIN;
exports.default = (opcode, state) => {
    state.stack.push(new ORIGIN());
};
//# sourceMappingURL=origin.js.map