export default class Transaction {
    blockHash?: string;
    blockNumber?: number;
    from?: string;
    gas?: number;
    gasPrice?: number;
    input?: string;
    to?: string;
    value?: number;
    constructor(transactionObject?: any);
    setInput(input: string): void;
    getFunctionHash(): string | false;
    getFunction(): string | false;
    getFunctionName(): string | false;
    getRawArguments(): string[];
    getArguments(descriptive?: boolean): string[];
    isContractCreation(): boolean;
}
