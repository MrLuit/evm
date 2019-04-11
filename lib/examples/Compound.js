"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Web3 = require('web3');
const index_1 = require("../src/index");
const web3 = new Web3(new Web3.providers.HttpProvider('https://api.mycryptoapi.com/eth'));
(() => __awaiter(this, void 0, void 0, function* () {
    const address = '0x3FDA67f7583380E67ef93072294a7fAc882FD7E7';
    const code = yield web3.eth.getCode(address);
    console.time();
    const evm = new index_1.EVM(code);
    console.log(evm.decompile());
    console.timeEnd();
}))();
//# sourceMappingURL=Compound.js.map