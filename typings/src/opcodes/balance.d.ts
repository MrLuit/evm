import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
export declare class BALANCE {
    readonly name: string;
    readonly type?: string;
    readonly wrapped: boolean;
    readonly address: any;
    constructor(address: any);
    toString(): string;
}
declare const _default: (opcode: Opcode, state: EVM) => void;
export default _default;
