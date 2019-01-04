import 'mocha';
import { expect } from 'chai';
import EVM from '../../src/classes/evm.class';

describe('evm.class.ts', () => {
    it('should create an instance', () => {
        const evm = new EVM('0xfd');
        expect(evm).to.be.an.instanceof(EVM);
    });

    it('should reset properly', () => {
        const evm = new EVM('0x6000');
        evm.run();
        expect(evm.stack.elements).to.deep.equal(['00']);
        evm.reset();
        expect(evm.stack.elements).to.deep.equal([]);
    });

    it('should clone properly', () => {
        const evm1 = new EVM('0x6000');
        evm1.run();
        const evm2 = evm1.clone();
        evm1.reset();
        expect(evm1.stack.elements).to.deep.equal([]);
        expect(evm2.stack.elements).to.deep.equal(['00']);
    });
});
