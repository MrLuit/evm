import * as functionHashes from '../../data/functionHashes.json';
import * as BigNumber from '../../node_modules/big-integer';

export default (storage: any, functions: any, instructions: any) => {
    const variableFunctions: any = [];
    Object.keys(functions)
        .filter(
            (functionName: string) =>
                functionName in functionHashes &&
                (functionHashes as any)[functionName].endsWith('()')
        )
        .forEach((functionName: string) => {
            const functionTree = functions[functionName];
            if (
                functionTree.items.length === 1 &&
                functionTree.items[0].name === 'RETURN' &&
                functionTree.items[0].items.length === 1 &&
                functionTree.items[0].items[0].name === 'SLOAD' &&
                BigNumber.isInstance(functionTree.items[0].items[0].location)
            ) {
                variableFunctions.push(
                    'public ' + (functionHashes as any)[functionName].split('(')[0] + ';'
                );
                storage[
                    functionTree.items[0].items[0].location.toString(16)
                ] = (functionHashes as any)[functionName].split('(')[0];
                delete functions[functionName];
            }
        });
    if (variableFunctions.length > 0) {
        return variableFunctions.join('\n') + '\n\n';
    } else {
        return variableFunctions.join('\n');
    }
};
