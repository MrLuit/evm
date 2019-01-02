import Instruction from '../classes/instruction.class';

export default (opcode: any, state: any) => {
    const storeLocation = state.stack.pop();
    const storeData = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    const storageVar = 'storage[' + storeLocation + ']';
    if (storeData.includes(storageVar + ' + ')) {
        instruction.setDescription(
            'storage[%s] += %s;',
            storeLocation,
            storeData.split(storageVar + ' + ')[1].slice(0, -1)
        );
    } else if (storeData.includes(storageVar + ' - ')) {
        instruction.setDescription(
            'storage[%s] -= %s;',
            storeLocation,
            storeData.split(storageVar + ' - ')[1].slice(0, -1)
        );
    } else if (!isNaN(parseInt(storeLocation, 16))) {
        instruction.setDescription('storage[0x%s] = %s;', storeLocation, storeData);
    } else {
        instruction.setDescription('storage[%s] = %s;', storeLocation, storeData);
    }
    state.storage[storeLocation] = storeData;
    return instruction;
};
