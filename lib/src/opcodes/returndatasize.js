"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RETURNDATASIZE {
    constructor() {
        this.name = 'RETURNDATASIZE';
        this.wrapped = false;
    }
    toString() {
        return 'output.length';
    }
}
exports.RETURNDATASIZE = RETURNDATASIZE;
exports.default = (opcode, state) => {
    state.stack.push(new RETURNDATASIZE());
};
//# sourceMappingURL=returndatasize.js.map