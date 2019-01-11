import * as abi from 'ethereumjs-abi';
import * as BigNumber from '../../node_modules/big-integer';
import * as functionHashes from '../../data/functionHashes.json';

const parseSingle = (data: any, type: any) => {
    if (type === 'string') {
        return '"' + Buffer.from(data, 'hex').toString('utf8') + '"';
    } else if (type === 'address') {
        return '0x' + data.substring(24);
    } else if (type === 'uint256' || type === 'uint8') {
        return BigNumber(data, 16).toString();
    } else if (type === 'bool') {
        return (!BigNumber(data, 16).isZero()).toString();
    } else {
        return data;
    }
};

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

    getFunctionName(): string | false {
        const rawFunction = this.getFunction();
        if (rawFunction) {
            return rawFunction.split('(')[0];
        } else {
            return false;
        }
    }

    getRawArguments(): string[] {
        if (this.input && this.input.length >= 70) {
            return this.input.substr(8).match(/.{1,64}/g)!;
        } else {
            return [];
        }
    }

    getArguments(descriptive: boolean = true): string[] {
        const functionName = this.getFunction();
        const functionArguments = this.getRawArguments();
        if (functionName && this.input) {
            const rawFunctionArguments = functionName
                .split('(')[1]
                .slice(0, -1)
                .split(',');
            if (
                rawFunctionArguments.length === 1 &&
                rawFunctionArguments[0] === '' &&
                functionArguments.length === 0
            ) {
                return [];
            } else {
                /*const decodedABI = abi.rawDecode(rawFunctionArguments, Buffer.from(this.input.substring(8),"hex")).map((b: any) => b.toString("hex"));
                if(decodedABI) {
                    return decodedABI;
                } else {
                    return functionArguments;
                }*/
                const result: string[] = [];
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
                        /*console.log(location);
                        console.log(length);
                        console.log(data);
                        console.log('.');*/
                        result.push(parseSingle(data, functionArgumentType));
                    } else {
                        result.push(parseSingle(functionArgument, functionArgumentType));
                    }
                }
                return result;
                /*return functionArguments.map((functionArgument: string, index: number) => {
                    const functionArgumentType = rawFunctionArguments[index] || "unknown";
                    let formattedFunctionArgument = functionArgument;
                    if(functionArgumentType === "address") {
                        formattedFunctionArgument = "0x" + functionArgument.substring(24);
                    } else if(functionArgumentType === "uint256" || functionArgumentType === "uint8") {
                        formattedFunctionArgument = BigNumber(functionArgument,16).toString();
                    } else if(functionArgumentType === "bool") {
                        formattedFunctionArgument = (!BigNumber(functionArgument,16).isZero()).toString();
                    }
                    if(descriptive) {
                        return functionArgumentType + ' ' + formattedFunctionArgument;
                    } else {
                        return formattedFunctionArgument;
                    }
                });*/
            }
        } else {
            return functionArguments;
        }
    }

    isContractCreation(): boolean {
        return (this.to && this.to === '0x0000000000000000000000000000000000000000') === true;
    }
}
