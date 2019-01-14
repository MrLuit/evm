export default (variables: any) => {
    let output = '';

    Object.keys(variables).forEach((key: string, index: number) => {
        const variable = variables[key];
        const types = variable.types
            .map((type: any) => {
                if (typeof type === 'function') {
                    return type();
                } else {
                    return type;
                }
            })
            .filter((type: any) => type);
        if (types.length === 0) {
            types.push('unknown');
        }
        if (variable.label) {
            output += [...new Set(types)].join('|') + ' public ' + variable.label + ';';
        } else {
            output += [...new Set(types)].join('|') + ' var' + (index + 1).toString() + ';';
            index++;
        }
        output += '\n';
    });

    if (Object.keys(variables).length > 0) {
        output += '\n';
    }

    return output;
};
