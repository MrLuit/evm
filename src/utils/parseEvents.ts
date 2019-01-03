export default (events: string[]) => {
    if (events.length > 0) {
        return events.map(event => 'event ' + event.replace(/,/g, ', ') + ';').join('\n');
    } else {
        return false;
    }
};
