"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stringify_1 = require("../utils/stringify");
class BLOCKHASH {
    constructor(blockNumber) {
        this.name = 'BLOCKHASH';
        this.wrapped = true;
        this.number = blockNumber;
    }
    toString() {
        return 'block.blockhash(' + stringify_1.default(this.number) + ')';
    }
}
exports.BLOCKHASH = BLOCKHASH;
exports.default = (opcode, state) => {
    const blockNumber = state.stack.pop();
    state.stack.push(new BLOCKHASH(blockNumber));
};
//# sourceMappingURL=blockhash.js.map