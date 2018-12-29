const Web3 = require('web3');
const decompileBytecode = require("../");
const web3 = new Web3(new Web3.providers.HttpProvider("https://api.mycryptoapi.com/eth"));

(async () => {
    const code = await web3.eth.getCode("0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359");
    console.log(decompileBytecode(code));
})();