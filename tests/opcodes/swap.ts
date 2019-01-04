import 'mocha';
import { expect } from 'chai';
import Test from '../utils/opcodeTest';
import Instruction from '../../src/classes/instruction.class';
import SWAP from '../../src/opcodes/swap';

describe('swap.ts', () => {
    it('should swap 1st and 2nd items in stack', () => {
        const test = new Test('SWAP1');
        test.setStack(['00', 'ff']);
        expect(test.run(SWAP)).to.be.an.instanceof(Instruction);
        expect(test.getStack()).to.deep.equal(['ff', '00']);
    });

    it('should swap 1st and 3th items in stack', () => {
        const test = new Test('SWAP2');
        test.setStack(['00', 'aa', 'ff']);
        expect(test.run(SWAP)).to.be.an.instanceof(Instruction);
        expect(test.getStack()).to.deep.equal(['ff', 'aa', '00']);
    });
});
