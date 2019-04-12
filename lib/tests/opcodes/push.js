"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const BigNumber = require("../../node_modules/big-integer");
const evm_class_1 = require("../../src/classes/evm.class");
describe('PUSH', () => {
    it('should modify stack', () => {
        const evm = new evm_class_1.default('0x6001');
        chai_1.expect(evm.stack.elements).to.deep.equal([]);
        evm.parse();
        chai_1.expect(evm.stack.elements).to.deep.equal([BigNumber(1)]);
    });
});
//# sourceMappingURL=push.js.map