import Instruction from '../classes/instruction.class';

export default (opcode: any, state: any) => {
    const storeLocation = state.stack.pop();
    let storeData = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    const storageVar = 'storage[' + storeLocation + ']';

    if (storeData.includes(storageVar + ' + ')) {
        storeData = storeData.split(storageVar + ' + ')[1].slice(0, -1);
        instruction.setDescription('storage[%s] += %s;', storeLocation, storeData);
    } else if (storeData.includes(storageVar + ' - ')) {
        storeData = storeData.split(storageVar + ' - ')[1].slice(0, -1);
        instruction.setDescription('storage[%s] -= %s;', storeLocation, storeData);
    } else if (!isNaN(parseInt(storeLocation, 16))) {
        instruction.setDescription('storage[0x%s] = %s;', storeLocation, storeData);
    } else {
        instruction.setDescription('storage[%s] = %s;', storeLocation, storeData);
    }
    state.storage[storeLocation] = storeData;

    if (storeLocation.startsWith('keccak256(') && storeLocation.endsWith(')')) {
        const mappingIndicator = storeLocation
            .replace('keccak256(', '')
            .slice(0, -1)
            .replace(/msg\.data\[0x[0-9]+\]/g, '*')
            .replace(/msg\.sender/g, '*');
        if (!(mappingIndicator in state.mappings)) {
            state.mappings[mappingIndicator] = {
                keys: [
                    storeLocation
                        .replace('keccak256(', '')
                        .slice(0, -1)
                        .replace(new RegExp(' \\+ [0-9]+', 'g'), '')
                ],
                value: [storeData.replace(new RegExp(' + [0-9]+', 'g'), '')]
            };
        } else if (
            !state.mappings[mappingIndicator].keys.includes(
                storeLocation
                    .replace('keccak256(', '')
                    .slice(0, -1)
                    .replace(new RegExp(' \\+ [0-9]+', 'g'), '')
            )
        ) {
            state.mappings[mappingIndicator].keys.push(
                storeLocation
                    .replace('keccak256(', '')
                    .slice(0, -1)
                    .replace(new RegExp(' \\+ [0-9]+', 'g'), '')
            );
        } else if (
            !state.mappings[mappingIndicator].value.includes(
                storeData.replace(new RegExp(' \\+ [0-9]+', 'g'), '')
            )
        ) {
            state.mappings[mappingIndicator].value.push(
                storeData.replace(new RegExp(' \\+ [0-9]+', 'g'), '')
            );
        }
    }

    return instruction;
};
