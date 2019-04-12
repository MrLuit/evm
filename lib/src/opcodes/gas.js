"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GAS {
    constructor() {
        this.name = 'GAS';
        this.wrapped = false;
    }
    toString() {
        return 'gasleft()';
    }
}
exports.GAS = GAS;
exports.default = (opcode, state) => {
    state.stack.push(new GAS());
};
//# sourceMappingURL=gas.js.map