"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stringify_1 = require("../utils/stringify");
class BALANCE {
    constructor(address) {
        this.name = 'BALANCE';
        this.wrapped = false;
        this.address = address;
    }
    toString() {
        return stringify_1.default(this.address) + '.balance';
    }
}
exports.BALANCE = BALANCE;
exports.default = (opcode, state) => {
    const address = state.stack.pop();
    state.stack.push(new BALANCE(address));
};
//# sourceMappingURL=balance.js.map