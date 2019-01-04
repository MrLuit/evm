import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import Instruction from '../classes/instruction.class';

export default (opcode: Opcode, state: EVM): Instruction => {
    const storeLocation = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    instruction.setDebug();
    const storageVar = 'storage[' + storeLocation + ']';

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
                value: []
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
        }
    }

    if (!isNaN(parseInt(storeLocation, 16))) {
        instruction.setDescription('stack.push(storage[0x%s]);', storeLocation);
        state.stack.push('storage[0x' + storeLocation + ']');
    } else {
        instruction.setDescription('stack.push(storage[%s]);', storeLocation);
        state.stack.push('storage[' + storeLocation + ']');
    }
    return instruction;
};
