import 'mocha';
import { expect } from 'chai';
import { EVM } from '../../../src';
import { SELFDESTRUCT } from '../../../src/opcodes';
import Contract from '../../utils/contract.class';

describe('selfdestruct.sol', () => {
    const contract = new Contract();
    contract.loadFile('selfdestruct/selfdestruct.sol');
    const evm = new EVM(contract.bytecode());

    it('should compile without errors', () => {
        expect(contract.valid(), contract.errors().join('\n')).to.be.true;
    });

    it('should detect selfdestruct', () => {
        expect(evm.containsOpcode(SELFDESTRUCT)).to.be.true;
        expect(evm.containsOpcode('SELFDESTRUCT')).to.be.true;
    });
});
