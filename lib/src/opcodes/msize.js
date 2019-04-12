"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MSIZE {
    constructor() {
        this.name = 'MSIZE';
        this.wrapped = false;
    }
    toString() {
        return 'memory.length';
    }
}
exports.MSIZE = MSIZE;
exports.default = (opcode, state) => {
    state.stack.push(new MSIZE());
};
//# sourceMappingURL=msize.js.map