"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TIMESTAMP {
    constructor() {
        this.name = 'TIMESTAMP';
        this.wrapped = false;
    }
    toString() {
        return 'block.timestamp';
    }
}
exports.TIMESTAMP = TIMESTAMP;
exports.default = (opcode, state) => {
    state.stack.push(new TIMESTAMP());
};
//# sourceMappingURL=timestamp.js.map