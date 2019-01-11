export default (events: string[]) => {
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
                .map((a: string, i: number) => a + ' _arg' + i)
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
