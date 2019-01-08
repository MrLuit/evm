const Web3 = require('web3');
import { EVM } from '../src/index';
const web3 = new Web3(new Web3.providers.HttpProvider('https://api.mycryptoapi.com/eth'));

(async () => {
    const address = '0x3FDA67f7583380E67ef93072294a7fAc882FD7E7';
    const code = await web3.eth.getCode(address);
    console.time();
    const evm = new EVM(code);
    console.log(evm.decompile());
    console.timeEnd();
})();
