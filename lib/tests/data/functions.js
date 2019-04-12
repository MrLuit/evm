"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const functions = require("../../data/functions.json");
const validTypes = ['bool', 'string', 'address', 'bytes'];
for (let i = 1; i <= 32; i++) {
    validTypes.push('bytes' + i);
}
for (let i = 8; i <= 256; i += 8) {
    validTypes.push('uint' + i);
    validTypes.push('int' + i);
}
validTypes.forEach(type => validTypes.push(type + '[]'));
describe('functions.json', () => {
    it('should not contain duplicates', () => {
        chai_1.expect(functions).to.deep.equal([...new Set(functions)]);
    });
    it('entries should not contain spaces (`storage` being an exception)', () => {
        chai_1.expect(functions.filter(functionName => functionName.replace(/ storage/g, '').includes(' '))).to.deep.equal([]);
    });
    it('entries should not contain semicolons', () => {
        chai_1.expect(functions.filter(functionName => functionName.includes(';'))).to.deep.equal([]);
    });
    it('entries should be formatted correctly using `function(...arguments)` (example: `balanceOf(address)`)', () => {
        chai_1.expect(functions.filter(functionName => !functionName.match(/^[a-zA-Z0-9_$]+\([a-zA-Z0-9,._ \[\]\(\)]*\)$/))).to.deep.equal([]);
    });
    it('entries should contain valid arguments', () => {
        functions.forEach(functionName => {
            const functionArgumentsRaw = /^[a-zA-Z0-9]+\(([a-zA-Z0-9,]*)\)$/.exec(functionName);
            if (functionArgumentsRaw) {
                const functionArguments = functionArgumentsRaw[1].split(',');
                if (functionArguments.length === 1 && functionArguments[0] === '') {
                    functionArguments.pop();
                }
                chai_1.expect(functionArguments, functionName + ' contains `uint` (should be `uint256`)').to.not.include('uint');
                chai_1.expect(functionArguments, functionName + ' contains `int` (should be `int256`)').to.not.include('int');
                chai_1.expect(functionArguments, functionName + ' contains `byte` (should be `bytes1`)').to.not.include('byte');
                chai_1.expect(functionArguments.filter(functionArgument => validTypes.indexOf(functionArgument) === -1 &&
                    functionArgument.charAt(0).toUpperCase() !== functionArgument.charAt(0)), functionName).to.deep.equal([]);
            }
        });
    })
        .timeout(20000)
        .slow(10000);
});
//# sourceMappingURL=functions.js.map