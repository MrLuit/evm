import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import Instruction from '../classes/instruction.class';
import * as eventHashes from '../../data/eventHashes.json';

export default (opcode: Opcode, state: EVM): Instruction => {
    const topicsCount = parseInt(opcode.name.replace('LOG', ''), 10);
    const memoryStart = state.stack.pop();
    const memoryLength = state.stack.pop();
    const topics = [];
    for (let i = 0; i < topicsCount; i++) {
        topics.push(state.stack.pop());
    }
    const instruction = new Instruction(opcode.name, opcode.pc);
    if (topics.length > 0 && topics[0] in eventHashes) {
        const fullEventName = (eventHashes as any)[topics[0]];
        const eventName = fullEventName.split('(')[0];
        topics.shift();
        if (parseInt(memoryLength, 16) === 32 && memoryStart in state.memory) {
            instruction.setDescription(
                'emit ' + eventName + '(' + [...topics, state.memory[memoryStart]].join(', ') + ');'
            );
        } else {
            instruction.setDescription(
                'emit ' +
                    eventName +
                    '(' +
                    [
                        ...topics,
                        'memory[' + memoryStart + ',(' + memoryStart + '+' + memoryLength + ')]'
                    ].join(', ') +
                    ');'
            );
        }
    } else {
        instruction.setDescription(
            'log(memory[%s,(%s+%s)],%s);',
            memoryStart,
            memoryStart,
            memoryLength,
            topics.join(', ')
        );
    }
    return instruction;
};
