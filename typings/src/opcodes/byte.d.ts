import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
export declare class BYTE {
    readonly name: string;
    readonly type?: string;
    readonly wrapped: boolean;
    readonly position: any;
    readonly data: any;
    constructor(position: any, data: any);
    toString(): string;
}
declare const _default: (opcode: Opcode, state: EVM) => void;
export default _default;
