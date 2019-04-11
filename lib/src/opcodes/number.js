"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NUMBER {
    constructor() {
        this.name = 'NUMBER';
        this.wrapped = false;
    }
    toString() {
        return 'block.number';
    }
}
exports.NUMBER = NUMBER;
exports.default = (opcode, state) => {
    state.stack.push(new NUMBER());
};
//# sourceMappingURL=number.js.map