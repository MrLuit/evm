"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stringify_1 = require("../utils/stringify");
class EXTCODESIZE {
    constructor(address) {
        this.name = 'EXTCODESIZE';
        this.wrapped = true;
        this.address = address;
    }
    toString() {
        return 'address(' + stringify_1.default(this.address) + ').code.length';
    }
}
exports.EXTCODESIZE = EXTCODESIZE;
exports.default = (opcode, state) => {
    const address = state.stack.pop();
    state.stack.push(new EXTCODESIZE(address));
};
//# sourceMappingURL=extcodesize.js.map