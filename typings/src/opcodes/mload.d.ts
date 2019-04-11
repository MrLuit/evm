import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
export declare class MLOAD {
    readonly name: string;
    readonly type?: string;
    readonly wrapped: boolean;
    readonly location: any;
    constructor(location: any);
    toString(): string;
}
declare const _default: (opcode: Opcode, state: EVM) => void;
export default _default;
