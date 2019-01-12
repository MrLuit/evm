import * as BigNumber from '../../node_modules/big-integer';

export default (variables: any) => {
    let output = '';

    Object.keys(variables).forEach((key: string) => {
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
        output += types.join('|') + ' public ' + variable.label + ';';
        output += '\n';
    });

    if (Object.keys(variables).length > 0) {
        output += '\n';
    }

    return output;
};
