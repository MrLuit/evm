const EVM = require("./src/evm.class");

module.exports = (byteCode,debug = false) => {
    const evm = new EVM(byteCode);
    return evm.toString(debug);
}