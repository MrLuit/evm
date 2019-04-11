"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const src_1 = require("../../../src");
const contract_class_1 = require("../../utils/contract.class");
describe('erc165.sol', () => {
    const contract = new contract_class_1.default();
    contract.loadFile('erc165/contract.sol');
    const evm = new src_1.EVM(contract.bytecode());
    it('should compile without errors', () => {
        chai_1.expect(contract.valid(), contract.errors().join('\n')).to.be.true;
    });
    it('should detect ERC165', () => {
        chai_1.expect(evm.isERC165()).to.be.true;
    });
});
//# sourceMappingURL=index.js.map