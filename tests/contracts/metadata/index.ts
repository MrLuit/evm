import 'mocha';
import * as crypto from 'crypto';
import * as fs from 'fs';
import { expect } from 'chai';
import Contract from '../../utils/contract.class';
import EVM from '../../../src/classes/evm.class';
import { SELFDESTRUCT } from '../../../src/opcodes';

const metadata = fs.readFileSync('./tests/contracts/metadata/metadata.sol', 'utf8');

const generateFFMetadataContract = () => {
    while (true) {
        const contract = new Contract();
        const randomData = crypto.randomBytes(16).toString('hex');
        contract.load('metadata.sol', metadata.replace('[randomData]', randomData));
        const evm = new EVM(contract.bytecode());
        const swarmHash = evm.getSwarmHash();
        if (swarmHash && typeof swarmHash === 'string' && swarmHash.includes('ff')) {
            return contract;
        }
    }
};

describe('metadata.sol', () => {
    const contract = generateFFMetadataContract();
    const evm = new EVM(contract.bytecode());

    it('should compile without errors', () => {
        expect(contract.valid(), contract.errors().join('\n')).to.be.true;
    });

    it('should include false positive selfdestruct (`ff`) in metadata hash', () => {
        expect(evm.getSwarmHash()).to.include('ff');
    });

    it('should not detect selfdestruct', () => {
        expect(evm.containsOpcode(SELFDESTRUCT)).to.be.false;
        expect(evm.containsOpcode('SELFDESTRUCT')).to.be.false;
    });
});
