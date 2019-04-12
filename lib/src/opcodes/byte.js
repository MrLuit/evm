"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BigNumber = require("../../node_modules/big-integer");
const stringify_1 = require("../utils/stringify");
class BYTE {
    constructor(position, data) {
        this.name = 'BYTE';
        this.wrapped = true;
        this.position = position;
        this.data = data;
    }
    toString() {
        return '(' + stringify_1.default(this.data) + ' >> ' + stringify_1.default(this.position) + ') & 1';
    }
}
exports.BYTE = BYTE;
exports.default = (opcode, state) => {
    const position = state.stack.pop();
    const data = state.stack.pop();
    if (BigNumber.isInstance(data) && BigNumber.isInstance(position)) {
        state.stack.push(data.shiftRight(position).and(1));
    }
    else {
        state.stack.push(new BYTE(position, data));
    }
};
//# sourceMappingURL=byte.js.map