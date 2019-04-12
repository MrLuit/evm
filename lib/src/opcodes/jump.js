"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BigNumber = require("../../node_modules/big-integer");
const stringify_1 = require("../utils/stringify");
class JUMP {
    constructor(location, bad) {
        this.name = 'JUMP';
        this.wrapped = false;
        this.location = location;
        this.valid = true;
        if (bad) {
            this.valid = false;
        }
    }
    toString() {
        if (!this.valid) {
            return "revert(\"Bad jump destination\");";
        }
        else {
            return 'goto(' + stringify_1.default(this.location) + ');';
        }
    }
}
exports.JUMP = JUMP;
exports.default = (opcode, state) => {
    const jumpLocation = state.stack.pop();
    if (!BigNumber.isInstance(jumpLocation)) {
        state.halted = true;
        state.instructions.push(new JUMP(jumpLocation, true));
    }
    else {
        const opcodes = state.getOpcodes();
        const jumpLocationData = opcodes.find((o) => o.pc === jumpLocation.toJSNumber());
        if (!jumpLocationData) {
            state.halted = true;
            state.instructions.push(new JUMP(jumpLocation, true));
        }
        else {
            const jumpIndex = opcodes.indexOf(jumpLocationData);
            if (!(opcode.pc + ':' + jumpLocation.toJSNumber() in state.jumps)) {
                if (!jumpLocationData || jumpLocationData.name !== 'JUMPDEST') {
                    state.halted = true;
                    state.instructions.push(new JUMP(jumpLocation, true));
                }
                else if (jumpLocationData &&
                    jumpIndex >= 0 &&
                    jumpLocationData.name === 'JUMPDEST') {
                    state.jumps[opcode.pc + ':' + jumpLocation.toJSNumber()] = true;
                    state.pc = jumpIndex;
                }
                else {
                    state.halted = true;
                    state.instructions.push(new JUMP(jumpLocation, true));
                }
            }
            else {
                state.halted = true;
                state.instructions.push(new JUMP(jumpLocation));
            }
        }
    }
};
//# sourceMappingURL=jump.js.map