const Web3 = require('web3');
import { Transaction } from '../src/index';
const web3 = new Web3(new Web3.providers.HttpProvider('https://api.mycryptoapi.com/eth'));

(async () => {
    const txHashes = [
        '0xea0b0b749b9c291f1c933c2dc883b3c9ac30b570f2b0899b18472be5512ee0b8',
        '0xfdc2e71e2cd961b04f56d8929fc9fb26692a5b41821d2178eda9e35c2eb2af0b',
        '0xf2fda91498ef6f661230646bef977f51b779b3454c64f993e580901ae3d5089f',
        '0xbdc3c392fce18c706512ba21a9d00444d349e77d3d48f3259e828aec3ebdb3b7',
        '0x9e1d3403efa72f68ffd262e29b1e5662b75dda8ae5faaaa0d1f35dcdf2158b7d',
        '0x1e7b2f5ae04b1337b32b9975da098967f06a9487c8907b1aae8de0bedcdbe1c9',
        '0x4d8ced3c95407155224fbe1d975d65232f4237bf1ed26a648664c8be25a4138e',
        '0xdedff4b8ad80cafe7350f54b73fe764a3366415e4cf38364d419df0ea83f010f',
        '0xf153f63dd6b8e08c918c984307d9f68f04fed89118f8610e52cd9adfbd1b6645',
        '0xa54656081baa8e76a74d891782e5e523045bd76cb2fd88ad8dafb865636ae56c',
        '0xc80682000c727462ac07b64b3de4da43a3635922aa3dd26174fd59f8e8120278'
    ];

    const txs = await Promise.all(
        txHashes.map(async (tx: string) => {
            const data = await web3.eth.getTransaction(tx);
            return data;
        })
    );

    const txData = txs.map((tx: any) => {
        const transaction = new Transaction();
        transaction.setInput(tx.input);
        const functionName = transaction.getFunctionName();
        const functionArguments = transaction.getArguments();
        return functionName + '(' + functionArguments.join(',') + ')';
    });

    console.log(txData.join('\n\n'));
})();
