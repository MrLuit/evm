"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CODESIZE {
    constructor() {
        this.name = 'CODESIZE';
        this.wrapped = false;
    }
    toString() {
        return 'this.code.length';
    }
}
exports.CODESIZE = CODESIZE;
exports.default = (opcode, state) => {
    state.stack.push(new CODESIZE());
};
//# sourceMappingURL=codesize.js.map