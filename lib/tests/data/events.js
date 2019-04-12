"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const events = require("../../data/events.json");
const validTypes = ['bool', 'string', 'address', 'bytes'];
for (let i = 1; i <= 32; i++) {
    validTypes.push('bytes' + i);
}
for (let i = 8; i <= 256; i += 8) {
    validTypes.push('uint' + i);
    validTypes.push('int' + i);
}
validTypes.forEach(type => validTypes.push(type + '[]'));
describe('events.json', () => {
    it('should not contain duplicates', () => {
        chai_1.expect(events).to.deep.equal([...new Set(events)]);
    });
    it('entries should not contain spaces', () => {
        chai_1.expect(events.filter(eventName => eventName.includes(' '))).to.deep.equal([]);
    });
    it('entries should not contain semicolons', () => {
        chai_1.expect(events.filter(eventName => eventName.includes(';'))).to.deep.equal([]);
    });
    it('entries should be formatted correctly using `Event(...arguments)` (example: `Transfer(address,address,uint256)`)', () => {
        chai_1.expect(events.filter(eventName => !eventName.match(/^[a-zA-Z0-9_$]+\([a-zA-Z0-9,\[\]\(\)]*\)$/))).to.deep.equal([]);
    });
    it('entries should contain valid arguments', () => {
        events.forEach(eventName => {
            const eventArgumentsRaw = /^[a-zA-Z0-9]+\(([a-zA-Z0-9,]*)\)$/.exec(eventName);
            if (eventArgumentsRaw) {
                const eventArguments = eventArgumentsRaw[1].split(',');
                if (eventArguments.length === 1 && eventArguments[0] === '') {
                    eventArguments.pop();
                }
                chai_1.expect(eventArguments, eventName + ' contains `uint` (should be `uint256`)').to.not.include('uint');
                chai_1.expect(eventArguments, eventName + ' contains `int` (should be `int256`)').to.not.include('int');
                chai_1.expect(eventArguments, eventName + ' contains `byte` (should be `bytes1`)').to.not.include('byte');
                chai_1.expect(eventArguments.filter(eventArgument => validTypes.indexOf(eventArgument) === -1), eventName).to.deep.equal([]);
            }
        });
    })
        .timeout(10000)
        .slow(5000);
});
//# sourceMappingURL=events.js.map