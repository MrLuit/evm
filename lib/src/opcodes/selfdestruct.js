"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stringify_1 = require("../utils/stringify");
class SELFDESTRUCT {
    constructor(address) {
        this.name = 'SELFDESTRUCT';
        this.wrapped = true;
        this.address = address;
    }
    toString() {
        return 'selfdestruct(' + stringify_1.default(this.address) + ');';
    }
}
exports.SELFDESTRUCT = SELFDESTRUCT;
exports.default = (opcode, state) => {
    const address = state.stack.pop();
    state.halted = true;
    state.instructions.push(new SELFDESTRUCT(address));
};
//# sourceMappingURL=selfdestruct.js.map