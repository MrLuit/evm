import Instruction from '../classes/instruction.class';

export default (opcode: any, state: any) => {
    const startLocation = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    instruction.setDebug();
    if (startLocation === '00') {
        instruction.setDescription('stack.push(msg.data);');
        state.stack.push('msg.data');
    } else {
        instruction.setDescription('stack.push(msg.data[0x%s]);', startLocation);
        state.stack.push('msg.data[0x' + startLocation + ']');
    }
    return instruction;
};
