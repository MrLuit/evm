import * as fs from 'fs';
const web3 = require('web3');

import * as functions from '../data/functions.json';

functions.sort((a, b) => a.localeCompare(b));

const hashes: any = functions.reduce((map: any, functionName: any) => {
    map[web3.utils.sha3(functionName).substring(2, 10)] = functionName;
    return map;
}, {});

fs.writeFileSync('./data/functionHashes.json', JSON.stringify(hashes, null, 4));
fs.writeFileSync('./data/functions.json', JSON.stringify(functions, null, 4));

console.log('Updated functionHashes.json successfully');
