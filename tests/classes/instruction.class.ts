import 'mocha';
import { expect } from 'chai';
import Instruction from '../../src/classes/instruction.class';

describe('instruction.class.ts', () => {
    it('should create an instance', () => {
        const instruction = new Instruction('STOP', 0);
        expect(instruction).to.be.an.instanceof(Instruction);
        expect(instruction.name).to.equal('STOP');
        expect(instruction.pc).to.equal(0);
    });

    it('should halt', () => {
        const instruction = new Instruction('STOP', 0);
        instruction.halt();
        expect(instruction.halted).to.equal(true);
    });

    it('should correctly set debug level', () => {
        const instruction = new Instruction('STOP', 0);
        expect(instruction.debugLevel).to.equal(2);
        instruction.setDebug();
        expect(instruction.debugLevel).to.equal(0);
        instruction.setLevel(3);
        expect(instruction.debugLevel).to.equal(3);
    });
});
