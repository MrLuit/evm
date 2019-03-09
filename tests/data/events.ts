import 'mocha';
import { expect } from 'chai';
import * as events from '../../data/events.json';

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
        expect(events).to.deep.equal([...new Set(events)]);
    });

    it('entries should not contain spaces', () => {
        expect(events.filter(eventName => eventName.includes(' '))).to.deep.equal([]);
    });

    it('entries should not contain semicolons', () => {
        expect(events.filter(eventName => eventName.includes(';'))).to.deep.equal([]);
    });

    it('entries should be formatted correctly using `Event(...arguments)` (example: `Transfer(address,address,uint256)`)', () => {
        expect(
            events.filter(
                eventName => !eventName.match(/^[a-zA-Z0-9_$]+\([a-zA-Z0-9,\[\]\(\)]*\)$/)
            )
        ).to.deep.equal([]);
    });

    it('entries should contain valid arguments', () => {
        events.forEach(eventName => {
            const eventArgumentsRaw = /^[a-zA-Z0-9]+\(([a-zA-Z0-9,]*)\)$/.exec(eventName);
            if (eventArgumentsRaw) {
                const eventArguments = eventArgumentsRaw[1].split(',');
                if (eventArguments.length === 1 && eventArguments[0] === '') {
                    eventArguments.pop();
                }
                expect(
                    eventArguments,
                    eventName + ' contains `uint` (should be `uint256`)'
                ).to.not.include('uint');
                expect(
                    eventArguments,
                    eventName + ' contains `int` (should be `int256`)'
                ).to.not.include('int');
                expect(
                    eventArguments,
                    eventName + ' contains `byte` (should be `bytes1`)'
                ).to.not.include('byte');
                expect(
                    eventArguments.filter(
                        eventArgument => validTypes.indexOf(eventArgument) === -1
                    ),
                    eventName
                ).to.deep.equal([]);
            }
        });
    })
        .timeout(10000)
        .slow(5000);
});
