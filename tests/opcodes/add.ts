import 'mocha';
import { expect } from 'chai';
import Test from '../utils/opcodeTest';
import Instruction from '../../src/classes/instruction.class';
import ADD from '../../src/opcodes/add';

describe('add.ts', () => {
    it('should add two numbers', () => {
        const test = new Test('ADD');
        test.setStack(['1', '1']);
        expect(test.run(ADD)).to.be.an.instanceof(Instruction);
        expect(test.getStack()).to.deep.equal(['2']);
    });

    it('should add two strings', () => {
        const test = new Test('ADD');
        test.setStack(['x', 'y']);
        expect(test.run(ADD)).to.be.an.instanceof(Instruction);
        expect(test.getStack()).to.deep.equal(['(x + y)']);
    });

    it('should add 00 + number', () => {
        const test = new Test('ADD');
        test.setStack(['00', '1']);
        expect(test.run(ADD)).to.be.an.instanceof(Instruction);
        expect(test.getStack()).to.deep.equal(['1']);
    });

    it('should add number + 00', () => {
        const test = new Test('ADD');
        test.setStack(['1', '00']);
        expect(test.run(ADD)).to.be.an.instanceof(Instruction);
        expect(test.getStack()).to.deep.equal(['1']);
    });
});
