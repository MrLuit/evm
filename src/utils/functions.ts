import * as functionHashes from '../../data/functionHashes.json';

export default (functionHash: string) => {
    if (functionHash in functionHashes) {
        return (functionHashes as any)[functionHash];
    } else {
        return functionHash + '()';
    }
};
