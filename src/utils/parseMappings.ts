function escapeRegExp(data: string) {
    return data.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export default (code: string, mappings: any) => {
    const keys = Object.keys(mappings).filter(key => key.includes('*'));
    if (keys.length > 0) {
        return (
            keys
                .map((key, n) => {
                    let mappingKey = '*';
                    let mappingValue = '*';
                    const mappingVar = 'mapping' + (n + 1);
                    mappings[key].keys.forEach((storageVar: string) => {
                        let result;
                        const regex = new RegExp(
                            escapeRegExp('storage[keccak256(' + key + ')]')
                                .split('\\*')
                                .join('([a-zA-Z0-9_\\.\\[\\]]+)'),
                            'g'
                        );
                        const regex2 = new RegExp(
                            escapeRegExp('storage[keccak256(' + key + ')]')
                                .split('\\*')
                                .join('([a-zA-Z0-9_\\.\\[\\]]+)')
                        );
                        while ((result = regex.exec(code))) {
                            code = code.replace(regex2, mappingVar + '[' + result[1] + ']');
                        }
                    });
                    if (mappings[key].value.some((v: string) => v === 'msg.value')) {
                        mappingValue = 'uint256';
                    }
                    if (mappings[key].keys.some((k: string) => k === 'msg.sender')) {
                        mappingKey = 'address';
                    }
                    if (
                        mappings[key].keys.some(
                            (k: string) => k === 'msg.sender + keccak256(msg.data[0x04])'
                        )
                    ) {
                        mappingKey = 'address';
                        mappingValue = 'mapping (address => uint256)';
                    }
                    return (
                        'mapping (' + mappingKey + ' => ' + mappingValue + ') ' + mappingVar + ';'
                    );
                })
                .join('\n') +
            '\n\n' +
            code
        );
    } else {
        return code;
    }
};
