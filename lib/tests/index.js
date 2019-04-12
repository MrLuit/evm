"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
describe('classes', () => {
    require('./classes/evm.class');
    require('./classes/stack.class');
});
describe('contracts', () => {
    require('./contracts/erc165');
    require('./contracts/hello_world');
    require('./contracts/selfdestruct');
    require('./contracts/metadata');
});
describe('data', () => {
    require('./data/functions');
    require('./data/events');
});
describe('opcodes', () => {
    require('./opcodes/add');
    require('./opcodes/push');
    require('./opcodes/stop');
    require('./opcodes/sub');
});
//# sourceMappingURL=index.js.map