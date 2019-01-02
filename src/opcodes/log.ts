import Instruction from '../classes/instruction.class';
import * as eventHashes from '../../data/eventHashes.json';

export default (opcode: any, state: any) => {
    const topicsCount = parseInt(opcode.name.replace('LOG', ''), 10);
    const memoryStart = state.stack.pop();
    const memoryLength = state.stack.pop();
    const topics = [];
    for (let i = 0; i < topicsCount; i++) {
        topics.push(state.stack.pop());
    }
    const instruction = new Instruction(opcode.name, opcode.pc);
    instruction.setDescription(
        'log(memory[%s,(%s+%s)],%s);',
        memoryStart,
        memoryStart,
        memoryLength,
        topics
            .map(topic => {
                if (topic in eventHashes) {
                    return (eventHashes as any)[topic];
                } else {
                    return topic;
                }
            })
            .join(',')
    );
    return instruction;
};
