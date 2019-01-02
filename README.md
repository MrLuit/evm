# EVM Bytecode Decompiler

An ethereum virtual machine (EVM) bytecode decompiler

## Usage

> npm i evm-bytecode-decompiler

## API

### Methods

* **getByteCode()** - _Get raw bytecode_
* **getOpcodes()** - _Returns opcodes including pc and pushData (if included)_
* **getFunctions()** - _Parse functions from their signatures in bytecode_
* **getEvents()** - _Parse events from their signatures in bytecode_
* **clean()** - _Reset the EVM state (stack, memory, etc.)_
* **run()** - _Interpret opcodes by looping over them, returns array of interpreted opcodes_
* **decompile()** - _Decompile bytecode to readable pseudocode_

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