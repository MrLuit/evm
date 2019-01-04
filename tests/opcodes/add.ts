import 'mocha';
import { expect } from 'chai';
import Test from '../utils/opcodeTest';
import ADD from '../../src/opcodes/add';

describe('add.ts', () => {
    it('should add two numbers', () => {
        const test = new Test('ADD');
        test.setStack(['1', '1']);
        test.run(ADD);
        expect(test.getStack()).to.deep.equal(['2']);
    });

    it('should add two strings', () => {
        const test = new Test('ADD');
        test.setStack(['x', 'y']);
        test.run(ADD);
        expect(test.getStack()).to.deep.equal(['(x + y)']);
    });

    it('should add 00 + number', () => {
        const test = new Test('ADD');
        test.setStack(['00', '1']);
        test.run(ADD);
        expect(test.getStack()).to.deep.equal(['1']);
    });

    it('should add number + 00', () => {
        const test = new Test('ADD');
        test.setStack(['1', '00']);
        test.run(ADD);
        expect(test.getStack()).to.deep.equal(['1']);
    });
});
