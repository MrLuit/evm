import 'mocha';
import { expect } from 'chai';
import { EVM } from '../src';
import { SELFDESTRUCT } from '../src/opcodes';
import generateFFMetadataContract from './utils/generateFFMetadata';
import Contract from './utils/contract.class';

describe('contracts', () => {
    describe('hello_world.sol', () => {
        const contract = new Contract();
        contract.loadFile('hello_world.sol');
        const evm = new EVM(contract.bytecode());

        it('should compile without errors', () => {
            expect(contract.valid(), contract.errors().join('\n')).to.be.true;
        });

        it('should not detect selfdestruct', () => {
            expect(evm.containsOpcode(SELFDESTRUCT)).to.be.false;
            expect(evm.containsOpcode('SELFDESTRUCT')).to.be.false;
        });
    });

    describe('selfdestruct.sol', () => {
        const contract = new Contract();
        contract.loadFile('selfdestruct.sol');
        const evm = new EVM(contract.bytecode());

        it('should compile without errors', () => {
            expect(contract.valid(), contract.errors().join('\n')).to.be.true;
        });

        it('should detect selfdestruct', () => {
            expect(evm.containsOpcode(SELFDESTRUCT)).to.be.true;
            expect(evm.containsOpcode('SELFDESTRUCT')).to.be.true;
        });
    });

    describe('metadata.sol', () => {
        const contract = generateFFMetadataContract();
        const evm = new EVM(contract.bytecode());

        it('should compile without errors', () => {
            expect(contract.valid(), contract.errors().join('\n')).to.be.true;
        });

        it('should include false positive selfdestruct (`ff`) in metadata hash', () => {
            expect(evm.getSwarmHash()).to.include('ff');
        });

        it('should not detect selfdestruct', () => {
            expect(evm.containsOpcode(SELFDESTRUCT)).to.be.false;
            expect(evm.containsOpcode('SELFDESTRUCT')).to.be.false;
        });
    });
});

describe('data', () => {
    require('./data/functions');
    require('./data/events');
});

describe('opcodes', () => {
    require('./opcodes/add');
    require('./opcodes/push');
    require('./opcodes/stop');
    require('./opcodes/sub');
});

describe('classes', () => {
    require('./classes/evm.class');
    require('./classes/stack.class');
});
