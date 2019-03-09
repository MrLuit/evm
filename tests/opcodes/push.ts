import 'mocha';
import { expect } from 'chai';
import * as BigNumber from '../../node_modules/big-integer';
import EVM from '../../src/classes/evm.class';

describe('PUSH', () => {
    it('should modify stack', () => {
        const evm = new EVM('0x6001');
        expect(evm.stack.elements).to.deep.equal([]);
        evm.parse();
        expect(evm.stack.elements).to.deep.equal([BigNumber(1)]);
    });
});
