"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const _functions = require("../data/functions.json");
const _events = require("../data/events.json");
const _functionHashes = require("../data/functionHashes.json");
const _eventHashes = require("../data/eventHashes.json");
const tx_class_1 = require("./classes/tx.class");
exports.Transaction = tx_class_1.default;
const evm_class_1 = require("./classes/evm.class");
exports.EVM = evm_class_1.default;
exports.functions = _functions;
exports.events = _events;
exports.functionHashes = _functionHashes;
exports.eventHashes = _eventHashes;
__export(require("./opcodes"));
//# sourceMappingURL=index.js.map