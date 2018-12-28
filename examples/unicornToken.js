const Web3 = require('web3');
const EVM = require("../evm.class");
const web3 = new Web3(new Web3.providers.HttpProvider("https://api.mycryptoapi.com/eth"));

(async () => {
    const code = await web3.eth.getCode("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7");
    const evm = new EVM(code);
    console.log(evm.toString());
})();