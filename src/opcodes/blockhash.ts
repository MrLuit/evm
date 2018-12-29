import Instruction from '../classes/instruction.class';

export default (opcode: any, state: any) => {
    const blockNumber = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    instruction.setDebug();
    instruction.setDescription('stack.push(block.blockhash(%s));', blockNumber);
    state.stack.push('block.blockhash(' + blockNumber + ')');
    return instruction;
};
