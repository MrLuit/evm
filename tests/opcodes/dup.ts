import 'mocha';
import { expect } from 'chai';
import Test from '../utils/opcodeTest';
import DUP from '../../src/opcodes/dup';

describe('dup.ts', () => {
    it('should duplicate 1st item in stack', () => {
        const test = new Test('DUP1');
        test.setStack(['00']);
        expect(test.getStack()).to.deep.equal(['00', '00']);
    });

    it('should duplicate 2nd item in stack', () => {
        const test = new Test('DUP2');
        test.setStack(['00', 'ff']);
        expect(test.getStack()).to.deep.equal(['ff', '00', 'ff']);
    });
});
