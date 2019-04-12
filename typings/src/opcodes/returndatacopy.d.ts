import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
export declare class RETURNDATACOPY {
    readonly name: string;
    readonly type?: string;
    readonly wrapped: boolean;
    readonly returnDataPosition: any;
    readonly returnDataSize: any;
    constructor(returnDataPosition: any, returnDataSize: any);
    toString(): string;
}
declare const _default: (opcode: Opcode, state: EVM) => void;
export default _default;
