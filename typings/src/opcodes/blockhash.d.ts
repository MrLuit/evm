import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
export declare class BLOCKHASH {
    readonly name: string;
    readonly type?: string;
    readonly wrapped: boolean;
    readonly number: any;
    constructor(blockNumber: any);
    toString(): string;
}
declare const _default: (opcode: Opcode, state: EVM) => void;
export default _default;
