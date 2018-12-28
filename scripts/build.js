const fs = require("fs");
const Web3 = require('web3');

const knownFunctionHashes = [
    'name()',
    'symbol()',
    'decimals()',
    'totalSupply()',
    'ICO()',
    'creator()',
    'balanceOf(address)',
    'transfer(address,uint256)',
    'transferFrom(address,address,uint256)',
    'approve(address,uint256)',
    'allowance(address,address)',
    'enableICO()',
    'disableICO()'
];

if(fs.existsSync("./node_modules/ethereumjs-vm/dist/opcodes.js")) {
    const opcodesFile = fs.readFileSync("./node_modules/ethereumjs-vm/dist/opcodes.js","utf8");
    fs.writeFileSync("./utils/opcodes.js",opcodesFile);
    const hashes = {};
    knownFunctionHashes.forEach(name => {
        hashes[Web3.utils.sha3(name).substring(2,10)] = name;
    });
    fs.writeFileSync("./utils/functionHashes.json",JSON.stringify(hashes,null,4));
    console.log("Build successful!");
} else {
    throw new Error("Could not find opcodes.js in node_modules/ethereum-js-vm/dist, please make sure all dev dependencies are installed");
}