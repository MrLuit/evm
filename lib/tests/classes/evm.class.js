"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const evm_class_1 = require("../../src/classes/evm.class");
describe('evm.class.ts', () => {
    it('should create an instance', () => {
        const evm = new evm_class_1.default('0xfd');
        chai_1.expect(evm).to.be.an.instanceof(evm_class_1.default);
    });
});
//# sourceMappingURL=evm.class.js.map