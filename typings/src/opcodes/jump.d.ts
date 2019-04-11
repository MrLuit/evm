import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
export declare class JUMP {
    readonly name: string;
    readonly type?: string;
    readonly wrapped: boolean;
    readonly valid: boolean;
    readonly location: any;
    constructor(location: any, bad?: boolean);
    toString(): string;
}
declare const _default: (opcode: Opcode, state: EVM) => void;
export default _default;
