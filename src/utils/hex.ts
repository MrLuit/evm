function hex2a(hexx: any) {
    const hex = hexx.toString();
    let str = '';
    for (let i = 0; i < hex.length && hex.substr(i, 2) !== '00'; i += 2) {
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return str;
}

export function isHex(h: any) {
    const a = parseInt(h, 16);
    if (a.toString(16).length <= 2) {
        return '0'.repeat(2 - a.toString(16).length) + a.toString(16) === h || a.toString(16) === h;
    } else {
        return a.toString(16) === h;
    }
}

export default (data: any) => {
    if (isHex(data)) {
        const asciiString = hex2a(data);
        if (/^[a-zA-Z0-9]+$/.test(asciiString)) {
            return '"' + asciiString + '"';
        } else if (!isNaN(parseInt(data, 16))) {
            return parseInt(data, 16).toString();
        } else {
            return data;
        }
    } else {
        return data;
    }
};
