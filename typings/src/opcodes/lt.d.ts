import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
export declare class LT {
    readonly name: string;
    readonly type?: string;
    readonly wrapped: boolean;
    readonly left: any;
    readonly right: any;
    readonly equal: boolean;
    constructor(left: any, right: any, equal?: boolean);
    toString(): string;
}
declare const _default: (opcode: Opcode, state: EVM) => void;
export default _default;
