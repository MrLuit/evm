import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
export declare class CREATE2 {
    readonly name: string;
    readonly type?: string;
    readonly wrapped: boolean;
    readonly memoryStart: any;
    readonly memoryLength: any;
    readonly value: any;
    constructor(memoryStart: any, memoryLength: any, value: any);
    toString(): string;
}
declare const _default: (opcode: Opcode, state: EVM) => void;
export default _default;
