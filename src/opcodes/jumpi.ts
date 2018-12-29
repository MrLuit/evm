import EVM from '../classes/evm.class';
import Instruction from '../classes/instruction.class';

export default (opcode: any, state: any) => {
    const jumpLocation = state.stack.pop();
    const jumpCondition = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    instruction.setDescription('if%s goto(%s);', jumpCondition, jumpLocation);
    const opcodes = state.getOpcodes();
    const jumpIndex = opcodes.indexOf(
        opcodes.find((o: any) => o.pc === parseInt(jumpLocation, 16))
    );
    if (!(opcode.pc + ':' + parseInt(jumpLocation, 16) in state.jumps)) {
        state.jumps[opcode.pc + ':' + parseInt(jumpLocation, 16)] = true;
        if (jumpIndex >= 0) {
            instruction.halt();
            instruction.setJump({
                condition: jumpCondition,
                location: parseInt(jumpLocation, 16),
                true: new EVM(
                    state.code,
                    jumpIndex,
                    JSON.parse(JSON.stringify(state.stack)),
                    JSON.parse(JSON.stringify(state.memory)),
                    JSON.parse(JSON.stringify(state.jumps))
                ).run(),
                false: new EVM(
                    state.code,
                    parseInt((state.pc + 1).toString(), 10),
                    JSON.parse(JSON.stringify(state.stack)),
                    JSON.parse(JSON.stringify(state.memory)),
                    JSON.parse(JSON.stringify(state.jumps))
                ).run()
            });
        }
    }
    return instruction;
};
