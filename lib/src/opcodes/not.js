"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BigNumber = require("../../node_modules/big-integer");
const stringify_1 = require("../utils/stringify");
class NOT {
    constructor(item) {
        this.name = 'AND';
        this.wrapped = true;
        this.item = item;
    }
    toString() {
        return '~' + stringify_1.default(this.item);
    }
}
exports.NOT = NOT;
exports.default = (opcode, state) => {
    const item = state.stack.pop();
    if (BigNumber.isInstance(item)) {
        state.stack.push(item.not());
    }
    else {
        state.stack.push(new NOT(item));
    }
};
//# sourceMappingURL=not.js.map