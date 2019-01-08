import 'mocha';
import { expect } from 'chai';
import EVM from '../../src/classes/evm.class';

describe('evm.class.ts', () => {
    it('should create an instance', () => {
        const evm = new EVM('0xfd');
        expect(evm).to.be.an.instanceof(EVM);
    });
});
