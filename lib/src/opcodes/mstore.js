"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BigNumber = require("../../node_modules/big-integer");
const stringify_1 = require("../utils/stringify");
class MSTORE {
    constructor(location, data) {
        this.name = 'MSTORE';
        this.wrapped = true;
        this.location = location;
        this.data = data;
    }
    toString() {
        return 'memory[' + stringify_1.default(this.location) + '] = ' + stringify_1.default(this.data) + ';';
    }
}
exports.MSTORE = MSTORE;
exports.default = (opcode, state) => {
    const storeLocation = state.stack.pop();
    const storeData = state.stack.pop();
    if (BigNumber.isInstance(storeLocation)) {
        state.memory[storeLocation.toJSNumber()] = storeData;
    }
    else {
        state.instructions.push(new MSTORE(storeLocation, storeData));
    }
};
//# sourceMappingURL=mstore.js.map