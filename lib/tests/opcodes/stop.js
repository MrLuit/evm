"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const evm_class_1 = require("../../src/classes/evm.class");
describe('STOP', () => {
    it('should halt', () => {
        const evm = new evm_class_1.default('0x00');
        chai_1.expect(evm.halted).to.be.false;
        evm.parse();
        chai_1.expect(evm.halted).to.be.true;
    });
});
//# sourceMappingURL=stop.js.map