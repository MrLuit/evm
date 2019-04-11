"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const crypto = require("crypto");
const fs = require("fs");
const chai_1 = require("chai");
const contract_class_1 = require("../../utils/contract.class");
const evm_class_1 = require("../../../src/classes/evm.class");
const opcodes_1 = require("../../../src/opcodes");
const metadata = fs.readFileSync('./tests/contracts/metadata/contract.sol', 'utf8');
const generateFFMetadataContract = () => {
    while (true) {
        const contract = new contract_class_1.default();
        const randomData = crypto.randomBytes(16).toString('hex');
        contract.load('contract.sol', metadata.replace('[randomData]', randomData));
        const evm = new evm_class_1.default(contract.bytecode());
        const swarmHash = evm.getSwarmHash();
        if (swarmHash && typeof swarmHash === 'string' && swarmHash.includes('ff')) {
            return contract;
        }
    }
};
describe('metadata.sol', () => {
    const contract = generateFFMetadataContract();
    const evm = new evm_class_1.default(contract.bytecode());
    it('should compile without errors', () => {
        chai_1.expect(contract.valid(), contract.errors().join('\n')).to.be.true;
    });
    it('should include false positive selfdestruct (`ff`) in metadata hash', () => {
        chai_1.expect(evm.getSwarmHash()).to.include('ff');
    });
    it('should not detect selfdestruct', () => {
        chai_1.expect(evm.containsOpcode(opcodes_1.SELFDESTRUCT)).to.be.false;
        chai_1.expect(evm.containsOpcode('SELFDESTRUCT')).to.be.false;
    });
});
//# sourceMappingURL=index.js.map