const functionHashes = require("../../data/functionHashes.json");

module.exports = (functionHash) => {
    if(functionHash in functionHashes) {
        return functionHashes[functionHash];
    } else {
        return functionHash + '()';
    }
}