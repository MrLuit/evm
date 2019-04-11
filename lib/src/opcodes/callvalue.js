"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CALLVALUE {
    constructor() {
        this.name = 'CALLVALUE';
        this.wrapped = false;
    }
    toString() {
        return 'msg.value';
    }
}
exports.CALLVALUE = CALLVALUE;
exports.default = (opcode, state) => {
    state.stack.push(new CALLVALUE());
};
//# sourceMappingURL=callvalue.js.map