import 'mocha';
import { expect } from 'chai';
import Test from '../utils/opcodeTest';
import Instruction from '../../src/classes/instruction.class';
import POP from '../../src/opcodes/pop';

describe('pop.ts', () => {
    it('should pop last item from stack', () => {
        const test = new Test('POP');
        test.setStack(['01']);
        expect(test.run(POP)).to.be.an.instanceof(Instruction);
        expect(test.getStack()).to.deep.equal([]);
    });

    it('should not touch other items in stack', () => {
        const test = new Test('POP');
        test.setStack(['x', 'y']);
        expect(test.run(POP)).to.be.an.instanceof(Instruction);
        expect(test.getStack()).to.deep.equal(['y']);
    });
});
