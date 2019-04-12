"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BigNumber = require("../../node_modules/big-integer");
const functionHashes = require("../../data/functionHashes.json");
const parseSingle = (data, type) => {
    if (type === 'string') {
        return '"' + Buffer.from(data, 'hex').toString('utf8') + '"';
    }
    else if (type === 'address') {
        return '0x' + data.substring(24);
    }
    else if (type === 'uint256' || type === 'uint8') {
        return BigNumber(data, 16).toString();
    }
    else if (type === 'bool') {
        return (!BigNumber(data, 16).isZero()).toString();
    }
    else {
        return data;
    }
};
class Transaction {
    constructor(transactionObject) {
        if (transactionObject) {
            if ('blockHash' in transactionObject) {
                this.blockHash = transactionObject.blockHash;
            }
            if ('blockNumber' in transactionObject) {
                this.blockNumber = transactionObject.blockNumber;
            }
            if ('from' in transactionObject) {
                this.from = transactionObject.from;
            }
            if ('gas' in transactionObject) {
                this.gas = transactionObject.gas;
            }
            if ('gasPrice' in transactionObject) {
                this.gasPrice = transactionObject.gasPrice;
            }
            if ('input' in transactionObject) {
                this.input = transactionObject.input.replace('0x', '');
            }
            if ('to' in transactionObject) {
                this.to = transactionObject.to;
            }
            if ('value' in transactionObject) {
                this.value = transactionObject.value;
            }
        }
    }
    setInput(input) {
        this.input = input.replace('0x', '');
    }
    getFunctionHash() {
        if (this.input && this.input.length >= 8) {
            return this.input.substr(0, 8);
        }
        else {
            return false;
        }
    }
    getFunction() {
        const functionHash = this.getFunctionHash();
        if (functionHash && functionHash in functionHashes) {
            return functionHashes[functionHash];
        }
        else {
            return false;
        }
    }
    getFunctionName() {
        const rawFunction = this.getFunction();
        if (rawFunction) {
            return rawFunction.split('(')[0];
        }
        else {
            return false;
        }
    }
    getRawArguments() {
        if (this.input && this.input.length >= 70) {
            return this.input.substr(8).match(/.{1,64}/g);
        }
        else {
            return [];
        }
    }
    getArguments(descriptive = true) {
        const functionName = this.getFunction();
        const functionArguments = this.getRawArguments();
        if (functionName && this.input) {
            const rawFunctionArguments = functionName
                .split('(')[1]
                .slice(0, -1)
                .split(',');
            if (rawFunctionArguments.length === 1 &&
                rawFunctionArguments[0] === '' &&
                functionArguments.length === 0) {
                return [];
            }
            else {
                const result = [];
                for (let i = 0; i < rawFunctionArguments.length; i++) {
                    const functionArgumentType = rawFunctionArguments[i] || 'unknown';
                    const functionArgument = functionArguments[i];
                    if (functionArgumentType === 'string') {
                        const location = BigNumber(functionArgument, 16)
                            .divide(32)
                            .toJSNumber();
                        const length = BigNumber(functionArguments[location], 16)
                            .multiply(2)
                            .toJSNumber();
                        const data = this.input.substring(8).substr((location + 1) * 64, length);
                        result.push(parseSingle(data, functionArgumentType));
                    }
                    else {
                        result.push(parseSingle(functionArgument, functionArgumentType));
                    }
                }
                return result;
            }
        }
        else {
            return functionArguments;
        }
    }
    isContractCreation() {
        return this.to === null;
    }
}
exports.default = Transaction;
//# sourceMappingURL=tx.class.js.map