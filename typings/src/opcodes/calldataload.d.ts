import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
export declare class CALLDATALOAD {
    readonly name: string;
    readonly type?: string;
    readonly returntype?: string;
    readonly wrapped: boolean;
    readonly location: any;
    constructor(location: any);
    toString(): string;
}
declare const _default: (opcode: Opcode, state: EVM) => void;
export default _default;
