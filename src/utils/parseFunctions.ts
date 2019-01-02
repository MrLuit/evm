import mapFunctionParams from './functionParameters';
import * as functionHashes from '../../data/functionHashes.json';

export default (stringifiedInstructions: any) => {
    const functions: any = {};
    const switchCase: any = [];
    let currentFunction = '';
    let currentFunctionParamsMap: any = false;

    stringifiedInstructions.split('\n').forEach((line: any) => {
        if (!line.startsWith(' ') && line.includes('msg.sig')) {
            let functionHash = line.split(' == ').find((piece: any) => !piece.includes('msg.sig'));
            if (functionHash.includes('(')) {
                functionHash = functionHash.split('(')[1];
            } else if (functionHash.includes(')')) {
                functionHash = functionHash.split(')')[0];
            }
            if (functionHash in functionHashes) {
                functionHash = (functionHashes as any)[functionHash];
                const mappedFunctionParams = mapFunctionParams(functionHash);
                functionHash = mappedFunctionParams.function;
                currentFunctionParamsMap = mappedFunctionParams.map;
            } else {
                functionHash = functionHash + '()';
            }
            functions[functionHash] = [];
            currentFunction = functionHash;
            switchCase.push(line);
            switchCase.push('    return ' + functionHash + ';');
        } else if (!line.startsWith(' ')) {
            currentFunction = '';
            currentFunctionParamsMap = false;
            switchCase.push(line);
        } else if (currentFunction) {
            let newLine = line;
            Object.keys(currentFunctionParamsMap).forEach(key => {
                newLine = newLine.replace(
                    new RegExp(key.replace('[', '\\[').replace(']', '\\]'), 'g'),
                    currentFunctionParamsMap[key]
                );
            });
            functions[currentFunction].push(newLine);
        } else {
            switchCase.push(line);
        }
    });

    return (
        Object.keys(functions)
            .map(
                functionName =>
                    'function ' +
                    functionName +
                    ' {\n' +
                    functions[functionName].join('\n') +
                    '\n}\n\n'
            )
            .join('') + switchCase.join('\n')
    );
};
