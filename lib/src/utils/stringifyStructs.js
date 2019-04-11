"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (mappings) => {
    let output = '';
    Object.keys(mappings)
        .filter((key) => mappings[key].structs.length > 0)
        .forEach((key, index) => {
        const mapping = mappings[key];
        output += 'struct ' + mapping.name + 'Struct {\n';
        mapping.structs.forEach((struct) => {
            output += '    ' + struct.toString() + ';\n';
        });
        output += '}\n\n';
    });
    return output;
};
//# sourceMappingURL=stringifyStructs.js.map