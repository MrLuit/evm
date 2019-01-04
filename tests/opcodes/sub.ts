import 'mocha';
import { expect } from 'chai';
import Test from '../utils/opcodeTest';
import Instruction from '../../src/classes/instruction.class';
import SUB from '../../src/opcodes/sub';

describe('sub.ts', () => {
    it('should substract two numbers', () => {
        const test = new Test('SUB');
        test.setStack(['1', '1']);
        expect(test.run(SUB)).to.be.an.instanceof(Instruction);
        expect(test.getStack()).to.deep.equal(['0']);
    });

    it('should substract two strings', () => {
        const test = new Test('SUB');
        test.setStack(['x', 'y']);
        expect(test.run(SUB)).to.be.an.instanceof(Instruction);
        expect(test.getStack()).to.deep.equal(['(x - y)']);
    });

    it('should substract number - 00', () => {
        const test = new Test('SUB');
        test.setStack(['x', '00']);
        expect(test.run(SUB)).to.be.an.instanceof(Instruction);
        expect(test.getStack()).to.deep.equal(['x']);
    });
});
