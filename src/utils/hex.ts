export function hex2a(hexx: any) {
    const hex = hexx.toString();
    let str = '';
    for (let i = 0; i < hex.length && hex.substr(i, 2) !== '00'; i += 2) {
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return str;
}

export function pad32(data: string) {
    if (data.length >= 64) {
        return data;
    } else {
        return '0'.repeat(64 - data.length) + data;
    }
}

export function isHex(h: any) {
    return /^[0-9a-f-]+$/.test(h);
}

export default (data: any) => {
    if (isHex(data)) {
        const pieces = data.match(/.{1,64}/g);
        if (pieces.length === 3 && parseInt(pieces[0], 16) === 32) {
            const stringLength = parseInt(pieces[1], 16) * 2;
            const stringData = hex2a(pieces[2].substr(0, stringLength));
            return '"' + stringData + '"';
        } else if (!isNaN(parseInt(data, 16))) {
            return parseInt(data, 16).toString();
        } else {
            return data;
        }
    } else {
        return data;
    }
};
