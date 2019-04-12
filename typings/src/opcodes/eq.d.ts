import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
export declare class SIG {
    readonly name: string;
    readonly type?: string;
    readonly wrapped: boolean;
    readonly hash: string;
    constructor(hash: string);
    toString(): string;
}
export declare class EQ {
    readonly name: string;
    readonly type?: string;
    readonly wrapped: boolean;
    readonly left: any;
    readonly right: any;
    constructor(left: any, right: any);
    toString(): string;
}
declare const _default: (opcode: Opcode, state: EVM) => void;
export default _default;
