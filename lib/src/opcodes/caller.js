"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CALLER {
    constructor() {
        this.name = 'CALLER';
        this.name = 'address';
        this.wrapped = false;
    }
    toString() {
        return 'msg.sender';
    }
}
exports.CALLER = CALLER;
exports.default = (opcode, state) => {
    state.stack.push(new CALLER());
};
//# sourceMappingURL=caller.js.map