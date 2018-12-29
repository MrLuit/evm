const EVM = require('./evm.class.js');

export default (byteCode: any, debug = false) => {
    const evm = new EVM(byteCode);
    return evm.toString(debug);
};
