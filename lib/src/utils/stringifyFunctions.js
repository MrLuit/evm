"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stringifyInstructions_1 = require("./stringifyInstructions");
const functionHashes = require("../../data/functionHashes.json");
exports.default = (functionName, functionInstance) => {
    let output = '';
    output += 'function ';
    if (functionName in functionHashes) {
        const fullFunction = functionHashes[functionName];
        const fullFunctionName = fullFunction.split('(')[0];
        const fullFunctionArguments = fullFunction
            .replace(fullFunctionName, '')
            .substring(1)
            .slice(0, -1);
        if (fullFunctionArguments) {
            output += fullFunctionName + '(';
            output += fullFunctionArguments
                .split(',')
                .map((a, i) => a + ' _arg' + i)
                .join(', ');
            output += ')';
        }
        else {
            output += fullFunction;
        }
    }
    else {
        output += functionName + '()';
    }
    output += ' ' + functionInstance.visibility;
    if (functionInstance.constant) {
        output += ' view';
    }
    if (functionInstance.payable) {
        output += ' payable';
    }
    if (functionInstance.returns.length > 0) {
        output += ' returns (' + functionInstance.returns.join(', ') + ')';
    }
    output += ' {\n';
    output += stringifyInstructions_1.default(functionInstance.items, 4);
    output += '}\n\n';
    return output;
};
//# sourceMappingURL=stringifyFunctions.js.map