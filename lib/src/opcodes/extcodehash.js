"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stringify_1 = require("../utils/stringify");
class EXTCODEHASH {
    constructor(address) {
        this.name = 'EXTCODEHASH';
        this.wrapped = true;
        this.address = address;
    }
    toString() {
        return 'keccak256(address(' + stringify_1.default(this.address) + ').code)';
    }
}
exports.EXTCODEHASH = EXTCODEHASH;
exports.default = (opcode, state) => {
    const address = state.stack.pop();
    state.stack.push(new EXTCODEHASH(address));
};
//# sourceMappingURL=extcodehash.js.map