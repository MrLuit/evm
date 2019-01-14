import 'mocha';
import { expect } from 'chai';
import EVM from '../../src/classes/evm.class';

describe('STOP', () => {
    it('should halt', () => {
        const evm = new EVM('0x00');
        expect(evm.halted).to.be.false;
        evm.parse();
        expect(evm.halted).to.be.true;
    });
});
