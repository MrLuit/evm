import 'mocha';
import { expect } from 'chai';
import validTypes from '../utils/validTypes';
import * as functions from '../../data/functions.json';

describe('functions.json', () => {
    it('should not contain duplicates', () => {
        expect(functions).to.deep.equal([...new Set(functions)]);
    });

    it('entries should not contain spaces', () => {
        expect(functions.filter(functionName => functionName.includes(' '))).to.deep.equal([]);
    });

    it('entries should not contain semicolons', () => {
        expect(functions.filter(functionName => functionName.includes(';'))).to.deep.equal([]);
    });

    it('entries should be formatted correctly using `function(...arguments)` (example: `balanceOf(address)`)', () => {
        expect(
            functions.filter(
                functionName => !functionName.match(/^[a-zA-Z0-9_]+\([a-zA-Z0-9,\[\]]*\)$/)
            )
        ).to.deep.equal([]);
    });

    it('entries should contain valid arguments', () => {
        functions.forEach(functionName => {
            const functionArgumentsRaw = /^[a-zA-Z0-9]+\(([a-zA-Z0-9,]*)\)$/.exec(functionName);
            if (functionArgumentsRaw) {
                const functionArguments = functionArgumentsRaw[1].split(',');
                if (functionArguments.length === 1 && functionArguments[0] === '') {
                    functionArguments.pop();
                }
                expect(
                    functionArguments,
                    functionName + ' contains `uint` (should be `uint256`)'
                ).to.not.include('uint');
                expect(
                    functionArguments,
                    functionName + ' contains `int` (should be `int256`)'
                ).to.not.include('int');
                expect(
                    functionArguments,
                    functionName + ' contains `byte` (should be `bytes1`)'
                ).to.not.include('byte');
                expect(
                    functionArguments.filter(
                        functionArgument => validTypes.indexOf(functionArgument) === -1
                    ),
                    functionName
                ).to.deep.equal([]);
            }
        });
    });
});
