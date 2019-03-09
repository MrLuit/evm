const types = ['bool', 'string', 'address', 'bytes'];

for (let i = 1; i <= 32; i++) {
    types.push('bytes' + i);
}

for (let i = 8; i <= 256; i += 8) {
    types.push('uint' + i);
    types.push('int' + i);
}

types.forEach(type => types.push(type + '[]'));

export default types;
