"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const BigNumber = require("../../node_modules/big-integer");
const evm_class_1 = require("../../src/classes/evm.class");
describe('SUB', () => {
    it('should calculate `1 - 1`', () => {
        const evm = new evm_class_1.default('0x03');
        evm.stack.push(BigNumber(1));
        evm.stack.push(BigNumber(1));
        chai_1.expect(evm.stack.elements).to.deep.equal([BigNumber(1), BigNumber(1)]);
        evm.parse();
        chai_1.expect(evm.stack.elements).to.deep.equal([BigNumber(0)]);
    });
    it('should stringify `x - 1`', () => {
        const evm = new evm_class_1.default('0x03');
        evm.stack.push(BigNumber(1));
        evm.stack.push('x');
        chai_1.expect(evm.stack.elements).to.deep.equal(['x', BigNumber(1)]);
        evm.parse();
        chai_1.expect(evm.stack.elements[0].toString()).to.equal('x - 1');
    });
});
//# sourceMappingURL=sub.js.map