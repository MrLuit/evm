import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
export declare class NOT {
    readonly name: string;
    readonly type?: string;
    readonly wrapped: boolean;
    readonly item: any;
    constructor(item: any);
    toString(): string;
}
declare const _default: (opcode: Opcode, state: EVM) => void;
export default _default;
