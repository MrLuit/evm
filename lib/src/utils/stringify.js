"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BigNumber = require("../../node_modules/big-integer");
exports.default = (item) => {
    if (BigNumber.isInstance(item)) {
        return item.toString(16);
    }
    else if (!item.wrapped) {
        return item.toString();
    }
    else {
        return '(' + item.toString() + ')';
    }
};
//# sourceMappingURL=stringify.js.map