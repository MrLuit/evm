import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
export declare class MappingLoad {
    readonly name: string;
    readonly type?: string;
    readonly wrapped: boolean;
    readonly location: any;
    readonly count: any;
    readonly items: any;
    readonly structlocation?: any;
    readonly mappings: any;
    constructor(mappings: any, location: any, items: any, count: any, structlocation?: any);
    toString(): string;
}
export declare class SLOAD {
    readonly name: string;
    readonly type?: string;
    readonly wrapped: boolean;
    readonly location: any;
    readonly variables: any;
    constructor(location: any, variables: any);
    toString(): any;
}
declare const _default: (opcode: Opcode, state: EVM) => void;
export default _default;
