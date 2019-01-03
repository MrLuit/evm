import EVM from '../classes/evm.class';
import Instruction from '../classes/instruction.class';

export default (opcode: any, state: any) => {
    const jumpLocation = state.stack.pop();
    const jumpCondition = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    instruction.setDescription('if%s goto(%s);', jumpCondition, jumpLocation);
    const opcodes = state.getOpcodes();
    const jumpLocationData = opcodes.find((o: any) => o.pc === parseInt(jumpLocation, 16));
    const jumpIndex = opcodes.indexOf(jumpLocationData);
    if (!jumpLocationData || jumpLocationData.name !== 'JUMPDEST') {
        instruction.halt();
        instruction.setDescription('revert("Bad jump destination");');
    } else if (jumpCondition === '1') {
        instruction.setDebug();
        state.pc = jumpIndex;
    } else if (!(opcode.pc + ':' + parseInt(jumpLocation, 16) in state.jumps)) {
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
            instruction.setJump({
                condition: jumpCondition,
                location: parseInt(jumpLocation, 16),
                true: new EVM(
                    state.code,
                    jumpIndex,
                    JSON.parse(JSON.stringify(state.stack)),
                    JSON.parse(JSON.stringify(state.memory)),
                    JSON.parse(JSON.stringify(state.jumps)),
                    state.mappings,
                    state.layer + 1
                ).run(),
                false: new EVM(
                    state.code,
                    parseInt((state.pc + 1).toString(), 10),
                    JSON.parse(JSON.stringify(state.stack)),
                    JSON.parse(JSON.stringify(state.memory)),
                    JSON.parse(JSON.stringify(state.jumps)),
                    state.mappings,
                    state.layer + 1
                ).run()
            });
        }
    }
    return instruction;
};
