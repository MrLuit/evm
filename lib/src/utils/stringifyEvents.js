"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (stateEvents, events) => {
    const stateEventValues = Object.keys(stateEvents).map((key) => stateEvents[key]);
    let output = '';
    events.forEach((event) => {
        const eventName = event.split('(')[0];
        const eventArguments = event
            .replace(eventName, '')
            .substring(1)
            .slice(0, -1);
        output += 'event ';
        if (eventArguments) {
            output += eventName + '(';
            output += eventArguments
                .split(',')
                .map((a, i) => {
                const stateEvent = stateEventValues.find((e) => e.label === event);
                if (stateEvent && i < stateEvent.indexedCount) {
                    return a + ' indexed _arg' + i;
                }
                else {
                    return a + ' _arg' + i;
                }
            })
                .join(', ');
            output += ');';
        }
        else {
            output += event;
        }
        output += '\n';
    });
    if (events.length > 0) {
        output += '\n';
    }
    return output;
};
//# sourceMappingURL=stringifyEvents.js.map