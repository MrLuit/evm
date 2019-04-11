import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
export declare class CALLDATACOPY {
    readonly name: string;
    readonly type?: string;
    readonly wrapped: boolean;
    readonly startLocation: any;
    readonly copyLength: any;
    constructor(startLocation: any, copyLength: any);
    toString(): string;
}
declare const _default: (opcode: Opcode, state: EVM) => void;
export default _default;
