import 'mocha';
import { expect } from 'chai';
import { EVM } from '../../../src';
import { SELFDESTRUCT } from '../../../src/opcodes';
import Contract from '../../utils/contract.class';

describe('hello_world.sol', () => {
    const contract = new Contract();
    contract.loadFile('hello_world/contract.sol');
    const evm = new EVM(contract.bytecode());

    it('should compile without errors', () => {
        expect(contract.valid(), contract.errors().join('\n')).to.be.true;
    });

    it('should not detect selfdestruct', () => {
        expect(evm.containsOpcode(SELFDESTRUCT)).to.be.false;
        expect(evm.containsOpcode('SELFDESTRUCT')).to.be.false;
    });
});
