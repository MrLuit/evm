"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CALLDATASIZE {
    constructor() {
        this.name = 'CALLDATASIZE';
        this.wrapped = false;
    }
    toString() {
        return 'msg.data.length';
    }
}
exports.CALLDATASIZE = CALLDATASIZE;
exports.default = (opcode, state) => {
    state.stack.push(new CALLDATASIZE());
};
//# sourceMappingURL=calldatasize.js.map