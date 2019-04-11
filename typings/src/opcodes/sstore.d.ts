import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
export declare class MappingStore {
    readonly name: string;
    readonly type?: string;
    readonly wrapped: boolean;
    readonly location: any;
    readonly count: any;
    readonly items: any;
    readonly data: any;
    readonly structlocation?: any;
    readonly mappings: any;
    constructor(
        mappings: any,
        location: any,
        items: any,
        data: any,
        count: any,
        structlocation?: any
    );
    toString(): string;
}
export declare class SSTORE {
    readonly name: string;
    readonly type?: string;
    readonly wrapped: boolean;
    readonly location: any;
    readonly data: any;
    readonly variables: any;
    constructor(location: any, data: any, variables: any);
    toString(): string;
}
declare const _default: (opcode: Opcode, state: EVM) => void;
export default _default;
