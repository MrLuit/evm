import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import Instruction from '../classes/instruction.class';

export default (opcode: Opcode, state: EVM): Instruction => {
    const jumpLocation = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    instruction.setDescription('goto(%s);', jumpLocation);
    const opcodes = state.getOpcodes();
    const jumpLocationData = opcodes.find((o: any) => o.pc === parseInt(jumpLocation, 16));
    if (!jumpLocationData) {
        instruction.halt();
        instruction.setDescription('revert("Bad jump destination");');
    } else {
        const jumpIndex = opcodes.indexOf(jumpLocationData);
        if (!(opcode.pc + ':' + parseInt(jumpLocation, 16) in state.jumps)) {
            state.jumps[opcode.pc + ':' + parseInt(jumpLocation, 16)] = true;
            if (!jumpLocationData || jumpLocationData.name !== 'JUMPDEST') {
                instruction.halt();
                instruction.setDescription('revert("Bad jump destination");');
            } else if (jumpLocationData && jumpIndex >= 0 && jumpLocationData.name === 'JUMPDEST') {
                instruction.setDescription('goto(%s);', parseInt(jumpLocation, 16).toString());
                state.pc = jumpIndex - 1;
                instruction.setDebug();
            }
        }
    }
    return instruction;
};
