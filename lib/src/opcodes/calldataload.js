"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BigNumber = require("../../node_modules/big-integer");
const stringify_1 = require("../utils/stringify");
class CALLDATALOAD {
    constructor(location) {
        this.name = 'CALLDATALOAD';
        this.wrapped = false;
        this.location = location;
    }
    toString() {
        if (BigNumber.isInstance(this.location) && this.location.isZero()) {
            return 'msg.data';
        }
        else if (BigNumber.isInstance(this.location) &&
            this.location
                .subtract(4)
                .mod(32)
                .isZero()) {
            return ('_arg' +
                this.location
                    .subtract(4)
                    .divide(32)
                    .toString());
        }
        else {
            return 'msg.data[' + stringify_1.default(this.location) + ']';
        }
    }
}
exports.CALLDATALOAD = CALLDATALOAD;
exports.default = (opcode, state) => {
    const startLocation = state.stack.pop();
    state.stack.push(new CALLDATALOAD(startLocation));
};
//# sourceMappingURL=calldataload.js.map