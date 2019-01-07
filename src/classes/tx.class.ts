import * as functionHashes from '../../data/functionHashes.json';

export default class Transaction {
    blockHash?: string;
    blockNumber?: number;
    from?: string;
    gas?: number;
    gasPrice?: number;
    input?: string;
    to?: string;
    value?: number;

    setInput(input: string): void {
        this.input = input.replace('0x', '');
    }

    getFunctionHash(): string | false {
        if (this.input && this.input.length >= 8) {
            return this.input.substr(0, 8);
        } else {
            return false;
        }
    }

    getFunction(): string | false {
        const functionHash = this.getFunctionHash();
        if (functionHash && functionHash in functionHashes) {
            return (functionHashes as any)[functionHash];
        } else {
            return false;
        }
    }
}
