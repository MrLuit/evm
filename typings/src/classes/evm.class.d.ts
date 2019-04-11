/// <reference types="node" />
import Stack from './stack.class';
import Event from '../interfaces/event.interface';
import Instruction from '../interfaces/instruction.interface';
import Mapping from '../interfaces/mapping.interface';
import Opcode from '../interfaces/opcode.interface';
import Variable from '../interfaces/variable.interface';
export default class EVM {
    pc: number;
    stack: Stack;
    memory: any;
    opcodes: Opcode[];
    instructions: Instruction[];
    storage: any;
    jumps: any;
    code: Buffer;
    mappings: Mapping;
    layer: number;
    halted: boolean;
    functions: any;
    variables: Variable;
    events: Event;
    gasUsed: number;
    conditions: any;
    constructor(code: string | Buffer);
    clone(): EVM;
    getBytecode(): string;
    getOpcodes(): Opcode[];
    getFunctions(): string[];
    getEvents(): string[];
    containsOpcode(opcode: number | string): boolean;
    getJumpDestinations(): number[];
    getSwarmHash(): string | false;
    getABI(): any;
    reset(): void;
    parse(): Instruction[];
    decompile(): string;
    isERC165(): boolean;
}
