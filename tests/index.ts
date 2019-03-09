import 'mocha';

describe('contracts', () => {
    require('./contracts/hello_world');
    require('./contracts/selfdestruct');
    require('./contracts/metadata');
    require('./contracts/erc165');
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

describe('classes', () => {
    require('./classes/evm.class');
    require('./classes/stack.class');
});
