"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class COINBASE {
    constructor() {
        this.name = 'COINBASE';
        this.wrapped = false;
    }
    toString() {
        return 'block.coinbase';
    }
}
exports.COINBASE = COINBASE;
exports.default = (opcode, state) => {
    state.stack.push(new COINBASE());
};
//# sourceMappingURL=coinbase.js.map