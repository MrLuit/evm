"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CALLDATACOPY {
    constructor(startLocation, copyLength) {
        this.name = 'CALLDATACOPY';
        this.wrapped = true;
        this.startLocation = startLocation;
        this.copyLength = copyLength;
    }
    toString() {
        return ('msg.data[' +
            this.startLocation +
            ':(' +
            this.startLocation +
            '+' +
            this.copyLength +
            ')];');
    }
}
exports.CALLDATACOPY = CALLDATACOPY;
exports.default = (opcode, state) => {
    const memoryLocation = state.stack.pop();
    const startLocation = state.stack.pop();
    const copyLength = state.stack.pop();
    state.memory[memoryLocation] = new CALLDATACOPY(startLocation, copyLength);
};
//# sourceMappingURL=calldatacopy.js.map