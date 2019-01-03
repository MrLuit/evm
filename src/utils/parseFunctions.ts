import mapFunctionParams from './functionParameters';
import * as functionHashes from '../../data/functionHashes.json';

export default (stringifiedInstructions: any) => {
    const functions: any = {};
    let switchCase: any = [];
    let currentFunction: any = false;
    let currentFunctionParamsMap: any = false;

    stringifiedInstructions.split('\n').forEach((line: any) => {
        if (line === 'if(msg.data.length == 0) {' || line === 'if(msg.data.length < 04) {') {
            functions['()'] = {
                payable: false,
                payableCheck: true,
                visibility: 'external',
                lines: []
            };
            currentFunction = '()';
            currentFunctionParamsMap = {};
            switchCase.push(line);
            switchCase.push('    return default;');
        } else if (!line.startsWith(' ') && line.includes(' == ') && line.includes('msg.sig')) {
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
            functions[functionHash] = {
                payable: false,
                payableCheck: true,
                visibility: 'public',
                lines: []
            };
            currentFunction = functionHash;
            switchCase.push(line);
            switchCase.push('    return ' + functionHash.split('(')[0] + ';');
        } else if (!line.startsWith(' ') && line === '} else {') {
            functions['else()'] = {
                payable: false,
                payableCheck: true,
                visibility: 'external',
                lines: []
            };
            currentFunction = 'else()';
            currentFunctionParamsMap = {};
            switchCase.push(line);
            switchCase.push('    return else;');
        } else if (!line.startsWith(' ')) {
            currentFunction = false;
            currentFunctionParamsMap = false;
            switchCase.push(line);
        } else if (
            currentFunction !== false &&
            functions[currentFunction].lines.length === 0 &&
            functions[currentFunction].payableCheck
        ) {
            if (line !== '    require(msg.value == 0);') {
                functions[currentFunction].payable = true;
                let newLine = line;
                Object.keys(currentFunctionParamsMap).forEach(key => {
                    newLine = newLine.replace(
                        new RegExp(key.replace('[', '\\[').replace(']', '\\]'), 'g'),
                        currentFunctionParamsMap[key]
                    );
                });
                functions[currentFunction].lines.push(newLine);
            }
            functions[currentFunction].payableCheck = false;
        } else if (currentFunction !== false) {
            let newLine = line;
            Object.keys(currentFunctionParamsMap).forEach(key => {
                newLine = newLine.replace(
                    new RegExp(key.replace('[', '\\[').replace(']', '\\]'), 'g'),
                    currentFunctionParamsMap[key]
                );
            });
            functions[currentFunction].lines.push(newLine);
        } else {
            switchCase.push(line);
        }
    });

    if (
        '()' in functions &&
        'else()' in functions &&
        functions['()'].lines.join('\n') === functions['else()'].lines.join('\n')
    ) {
        switchCase = switchCase.map((switchCaseLine: string) =>
            switchCaseLine.replace('    return else;', '    return default;')
        );
        delete functions['else()'];
    }

    switchCase = switchCase.filter((line: string) => line !== '');

    if (
        switchCase.every(
            (line: string) =>
                line.includes('if(msg.sig == ') ||
                line.includes(' == msg.sig) {') ||
                line === 'if(msg.data.length == 0) {' ||
                line === 'if(msg.data.length < 04) {' ||
                line === '} else {' ||
                line === '}' ||
                line.startsWith('    return ')
        )
    ) {
        switchCase = [];
    }

    return (
        Object.keys(functions)
            .map(
                functionName =>
                    'function ' +
                    functionName +
                    (functions[functionName].payable ? ' payable ' : ' ') +
                    functions[functionName].visibility +
                    ' {\n' +
                    functions[functionName].lines.join('\n') +
                    '\n}\n\n'
            )
            .join('') + switchCase.join('\n')
    );
};
