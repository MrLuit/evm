"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const web3 = require('web3');
const functions = require("../data/functions.json");
const events = require("../data/events.json");
functions.sort((a, b) => a.localeCompare(b));
events.sort((a, b) => a.localeCompare(b));
const functionHashes = functions.reduce((map, functionName) => {
    map[web3.utils.sha3(functionName).substring(2, 10)] = functionName;
    return map;
}, {});
const eventHashes = events.reduce((map, eventName) => {
    map[web3.utils.sha3(eventName).substring(2)] = eventName;
    return map;
}, {});
fs.writeFileSync('./data/functionHashes.json', JSON.stringify(functionHashes, null, 4));
fs.writeFileSync('./data/functions.json', JSON.stringify(functions, null, 4));
fs.writeFileSync('./data/eventHashes.json', JSON.stringify(eventHashes, null, 4));
fs.writeFileSync('./data/events.json', JSON.stringify(events, null, 4));
console.log('Updated hashes successfully');
//# sourceMappingURL=build.js.map