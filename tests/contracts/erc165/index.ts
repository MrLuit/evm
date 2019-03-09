import 'mocha';
import { expect } from 'chai';
import { EVM } from '../../../src';
import Contract from '../../utils/contract.class';

describe('erc165.sol', () => {
    const contract = new Contract();
    contract.loadFile('erc165/erc165.sol');
    const evm = new EVM(contract.bytecode());

    it('should compile without errors', () => {
        expect(contract.valid(), contract.errors().join('\n')).to.be.true;
    });

    it('should detect ERC165', () => {
        expect(evm.isERC165()).to.be.true;
    });
});
