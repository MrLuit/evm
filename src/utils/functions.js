const functionHashes = require("./functionHashes");

module.exports = (functionHash) => {
    if(functionHash in functionHashes) {
        return functionHashes[functionHash];
    } else {
        return functionHash + '()';
    }
}