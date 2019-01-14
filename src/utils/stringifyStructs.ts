export default (mappings: any) => {
    let output = '';

    Object.keys(mappings)
        .filter((key: any) => mappings[key].structs.length > 0)
        .forEach((key: string, index: number) => {
            const mapping = mappings[key];
            output += 'struct ' + mapping.name + 'Struct {\n';
            mapping.structs.forEach((struct: any) => {
                output += '    ' + struct.toString() + ';\n';
            });
            output += '}\n\n';
        });

    return output;
};
