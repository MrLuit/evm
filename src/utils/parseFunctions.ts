import * as functionHashes from '../../data/functionHashes.json';

export default (stringifiedInstructions: any) => {
    return stringifiedInstructions
        .split('\n')
        .map((line: any) => {
            if (!line.startsWith(' ') && line.includes('msg.sig')) {
                let functionHash = line
                    .split(' == ')
                    .find((piece: any) => !piece.includes('msg.sig'));
                if (functionHash.includes('(')) {
                    functionHash = functionHash.split('(')[1];
                } else if (functionHash.includes(')')) {
                    functionHash = functionHash.split(')')[0];
                }
                if (functionHash in functionHashes) {
                    return line + '    /* ' + (functionHashes as any)[functionHash] + ' */';
                } else {
                    return line;
                }
            } else {
                return line;
            }
        })
        .join('\n');
};
