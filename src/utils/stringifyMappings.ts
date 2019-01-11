const stringifyMapping = (mapping: any) => {
    const mappingKey: string[] = [];
    const mappingValue: string[] = [];
    let deepMapping = false;
    mapping.keys.forEach((mappingChild: any, index: number) => {
        if (mappingChild[0].type && !mappingKey.includes(mappingChild[0].type)) {
            mappingKey.push(mappingChild[0].type);
        }
        if (mappingChild.length > 1 && !deepMapping) {
            deepMapping = true;
            mappingValue.push(
                stringifyMapping({
                    keys: mapping.keys.map((items: any) => {
                        items.shift();
                        return items;
                    }),
                    values: mapping.values
                })
            );
        } else if (mappingChild.length === 1 && !deepMapping) {
            mapping.values.forEach((mappingChild2: any, index2: number) => {
                if (mappingChild2.type && !mappingValue.includes(mappingChild2.type)) {
                    mappingValue.push(mappingChild2.type);
                }
            });
        }
    });
    if (mappingKey.length === 0) {
        mappingKey.push('unknown');
    }
    if (mappingValue.length === 0) {
        mappingValue.push('unknown');
    }
    return 'mapping (' + mappingKey.join('|') + ' => ' + mappingValue.join('|') + ')';
};

export default (mappings: any) => {
    let output = '';

    Object.keys(mappings).forEach((key: string, index: number) => {
        const mapping = mappings[key];
        output += stringifyMapping(mapping) + ' mapping' + (index + 1) + ';';
        output += '\n';
    });

    if (Object.keys(mappings).length > 0) {
        output += '\n';
    }

    return output;
};
