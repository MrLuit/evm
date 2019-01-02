export default (functionName: string) => {
    let argumentLocationCounter = 0;
    const parsedFunctionArguments: any = [];
    const usedParsedFunctionArguments: any = {};
    const argumentLocationMap: any = {};
    const functionNameRaw = functionName.split('(')[0];
    const functionArguments = functionName
        .split('(')[1]
        .split(')')[0]
        .split(',');
    if (functionArguments.length === 1 && functionArguments[0] === '') {
        functionArguments.pop();
    }
    argumentLocationMap['msg.data[0x00]'] = 'msg.sig';
    argumentLocationCounter += 4;
    functionArguments.forEach(functionArgument => {
        let functionVar = '_' + functionArgument;
        if (functionVar in usedParsedFunctionArguments) {
            usedParsedFunctionArguments[functionVar]++;
            functionVar = functionVar + usedParsedFunctionArguments[functionVar].toString();
        } else {
            usedParsedFunctionArguments[functionVar] = 0;
        }
        parsedFunctionArguments.push(functionArgument + ' ' + functionVar);
        argumentLocationMap[
            'msg.data[0x' +
                '0'.repeat(2 - argumentLocationCounter.toString(16).length) +
                argumentLocationCounter.toString(16) +
                ']'
        ] = functionVar;
        argumentLocationCounter += 32;
    });
    return {
        function: functionNameRaw + '(' + parsedFunctionArguments.join(', ') + ')',
        arguments: parsedFunctionArguments,
        map: argumentLocationMap
    };
};
