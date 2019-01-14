export default (stateEvents: any, events: string[]) => {
    const stateEventValues = Object.keys(stateEvents).map((key: string) => stateEvents[key]);
    let output = '';

    events.forEach((event: string) => {
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
                .map((a: string, i: number) => {
                    const stateEvent = stateEventValues.find((e: any) => e.label === event);
                    if (stateEvent && i < stateEvent.indexedCount) {
                        return a + ' indexed _arg' + i;
                    } else {
                        return a + ' _arg' + i;
                    }
                })
                .join(', ');
            output += ')';
        } else {
            output += event;
        }
        output += '\n';
    });

    if (events.length > 0) {
        output += '\n';
    }

    return output;
};
