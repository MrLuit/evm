# EVM Bytecode Decompiler
[![](https://img.shields.io/travis/com/MrLuit/evm-bytecode-decompiler.svg?style=flat-square)](https://travis-ci.com/MrLuit/evm-bytecode-decompiler)
[![](https://img.shields.io/github/package-json/v/MrLuit/evm-bytecode-decompiler.svg?style=flat-square)](https://github.com/MrLuit/evm-bytecode-decompiler/blob/master/package.json#L3)
<a href="https://david-dm.org/MrLuit/evm-bytecode-decompiler">
[![](https://img.shields.io/david/MrLuit/evm-bytecode-decompiler.svg?style=flat-square)](https://david-dm.org/MrLuit/evm-bytecode-decompiler)
[![](https://img.shields.io/github/license/MrLuit/evm-bytecode-decompiler.svg?style=flat-square)](https://github.com/MrLuit/evm-bytecode-decompiler/blob/master/LICENSE)
    
An [Ethereum Virtual Machine (EVM)](https://medium.com/@jeff.ethereum/optimising-the-ethereum-virtual-machine-58457e61ca15) bytecode decompiler

## Usage

> npm i evm-bytecode-decompiler

## API

### Methods

* **getBytecode()** - _Get raw bytecode (not really useful; same as input)_
* **getOpcodes()** - _Returns opcodes including pc and pushData (if included)_
* **getFunctions()** - _Parse functions from their signatures in bytecode_
* **getEvents()** - _Parse events from their signatures in bytecode_
* **getJumpDestinations()** - _Get array of program counters from JUMPDEST opcodes_
* **getSwarmHash()** - _Get Swarm hash (if any) for contract metadata_
* **reset()** - _Reset the EVM state (stack, memory, etc.)_
* **run()** - _Interpret opcodes by looping over them, returns array of interpreted opcodes_
* **decompile()** - _Decompile bytecode into readable [Solidity](https://en.wikipedia.org/wiki/Solidity)-like pseudocode_

## Example

### Node.js

```javascript
const EVM = require("evm-bytecode-decompiler");
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("https://api.mycryptoapi.com/eth"));

web3.eth.getCode("0x06012c8cf97BEaD5deAe237070F9587f8E7A266d").then(code => {  /* CryptoKitties contract */
    const evm = new EVM(code);
    console.log(evm.getOpcodes());  /* Get opcodes */
    console.log(evm.getFunctions());  /* Get functions */
    console.log(evm.getEvents());  /* Get events */
    console.log(evm.decompile());  /* Decompile bytecode */
});
```

### Browser
```javascript
// API is available as `window.EVM`
const web3 = new Web3(window.web3.currentProvider);
web3.eth.getCode("0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359", function(err,code) {  /* DAI contract */
    if(err) throw err;
    const evm = new window.EVM(code);
    console.log(evm.getOpcodes());  /* Get opcodes */
    console.log(evm.getFunctions());  /* Get functions */
    console.log(evm.getEvents());  /* Get events */
    console.log(evm.decompile());  /* Decompile bytecode */
});
```
