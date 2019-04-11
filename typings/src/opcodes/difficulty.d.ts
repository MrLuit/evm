import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
export declare class DIFFICULTY {
    readonly name: string;
    readonly type?: string;
    readonly wrapped: boolean;
    constructor();
    toString(): string;
}
declare const _default: (opcode: Opcode, state: EVM) => void;
export default _default;
