import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import Instruction from '../classes/instruction.class';

export default (opcode: Opcode, state: EVM): Instruction => {
    const jumpLocation = state.stack.pop();
    const jumpCondition = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    instruction.setDescription('if%s goto(%s);', jumpCondition, jumpLocation);
    const opcodes = state.getOpcodes();
    const jumpLocationData = opcodes.find((o: any) => o.pc === parseInt(jumpLocation, 16));
    if (!jumpLocationData || jumpLocationData.name !== 'JUMPDEST') {
        instruction.halt();
        instruction.setDescription('revert("Bad jump destination");');
    } else if (jumpCondition === '1') {
        const jumpIndex = opcodes.indexOf(jumpLocationData);
        instruction.setDebug();
        state.pc = jumpIndex;
    } else if (!(opcode.pc + ':' + parseInt(jumpLocation, 16) in state.jumps)) {
        const jumpIndex = opcodes.indexOf(jumpLocationData);
        state.jumps[opcode.pc + ':' + parseInt(jumpLocation, 16)] = true;
        const conditionParts = jumpCondition.split(' == ');
        if (
            conditionParts.length === 2 &&
            conditionParts[0].replace(/\(/g, '') === conditionParts[1].replace(/\)/g, '')
        ) {
            instruction.setDebug();
            state.pc = jumpIndex;
        } else if (jumpCondition === '1') {
            instruction.setDebug();
            state.pc = jumpIndex;
        } else if (jumpCondition === '0') {
            instruction.setDebug();
        } else if (jumpIndex >= 0) {
            instruction.halt();
            const trueClone = state.clone();
            trueClone.pc = jumpIndex;
            const falseClone = state.clone();
            falseClone.pc = state.pc + 1;
            instruction.setJump({
                condition: jumpCondition,
                location: parseInt(jumpLocation, 16),
                true: trueClone.run(),
                false: falseClone.run()
            });
        }
    }
    return instruction;
};
