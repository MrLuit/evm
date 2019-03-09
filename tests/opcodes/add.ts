import 'mocha';
import { expect } from 'chai';
import * as BigNumber from '../../node_modules/big-integer';
import EVM from '../../src/classes/evm.class';

describe('ADD', () => {
    it('should calculate `1 + 1`', () => {
        const evm = new EVM('0x01');
        evm.stack.push(BigNumber(1));
        evm.stack.push(BigNumber(1));
        expect(evm.stack.elements).to.deep.equal([BigNumber(1), BigNumber(1)]);
        evm.parse();
        expect(evm.stack.elements).to.deep.equal([BigNumber(2)]);
    });

    it('should stringify `x + 1`', () => {
        const evm = new EVM('0x01');
        evm.stack.push(BigNumber(1));
        evm.stack.push('x');
        expect(evm.stack.elements).to.deep.equal(['x', BigNumber(1)]);
        evm.parse();
        expect(evm.stack.elements[0].toString()).to.equal('x + 1');
    });
});
