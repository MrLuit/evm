import 'mocha';
import { expect } from 'chai';
import Test from '../utils/opcodeTest';
import SUB from '../../src/opcodes/sub';

describe('sub.ts', () => {
    it('should substract two numbers', () => {
        const test = new Test('SUB');
        test.setStack(['1', '1']);
        test.run(SUB);
        expect(test.getStack()).to.deep.equal(['0']);
    });

    it('should substract two strings', () => {
        const test = new Test('SUB');
        test.setStack(['x', 'y']);
        test.run(SUB);
        expect(test.getStack()).to.deep.equal(['(x - y)']);
    });

    it('should substract number - 00', () => {
        const test = new Test('SUB');
        test.setStack(['x', '00']);
        test.run(SUB);
        expect(test.getStack()).to.deep.equal(['x']);
    });
});
