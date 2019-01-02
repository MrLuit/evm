import Instruction from '../classes/instruction.class';

export default (opcode: any, state: any) => {
    const jumpLocation = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    instruction.setDescription('goto(%s);', jumpLocation);
    const opcodes = state.getOpcodes();
    const jumpIndex = opcodes.indexOf(
        opcodes.find((o: any) => o.pc === parseInt(jumpLocation, 16))
    );
    if (!(opcode.pc + ':' + parseInt(jumpLocation, 16) in state.jumps)) {
        state.jumps[opcode.pc + ':' + parseInt(jumpLocation, 16)] = true;
        if (jumpIndex >= 0) {
            state.pc = jumpIndex;
            instruction.setDebug();
        }
    }
    return instruction;
};
