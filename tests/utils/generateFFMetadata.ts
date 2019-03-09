import Contract from './contract.class';
import * as crypto from 'crypto';
import * as fs from 'fs';
import EVM from '../../src/classes/evm.class';

const metadata = fs.readFileSync('./tests/contracts/metadata.sol', 'utf8');

export default () => {
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
