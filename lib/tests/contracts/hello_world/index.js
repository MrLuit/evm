"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const src_1 = require("../../../src");
const opcodes_1 = require("../../../src/opcodes");
const contract_class_1 = require("../../utils/contract.class");
describe('hello_world.sol', () => {
    const contract = new contract_class_1.default();
    contract.loadFile('hello_world/contract.sol');
    const evm = new src_1.EVM(contract.bytecode());
    it('should compile without errors', () => {
        chai_1.expect(contract.valid(), contract.errors().join('\n')).to.be.true;
    });
    it('should not detect selfdestruct', () => {
        chai_1.expect(evm.containsOpcode(opcodes_1.SELFDESTRUCT)).to.be.false;
        chai_1.expect(evm.containsOpcode('SELFDESTRUCT')).to.be.false;
    });
});
//# sourceMappingURL=index.js.map