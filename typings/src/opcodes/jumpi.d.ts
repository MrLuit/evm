import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
export declare class TopLevelFunction {
    readonly name: string;
    readonly type?: string;
    readonly label: string;
    readonly hash: any;
    readonly gasUsed: number;
    readonly payable: boolean;
    readonly visibility: string;
    readonly constant: boolean;
    readonly items: any;
    readonly returns: any;
    constructor(items: any, hash: any, gasUsed: number);
}
export declare class Variable {
    readonly name: string;
    readonly label: string | false;
    readonly types: any;
    constructor(label: string | false, types: any);
}
export declare class REQUIRE {
    readonly name: string;
    readonly type?: string;
    readonly wrapped: boolean;
    readonly condition: any;
    constructor(condition: any);
    toString(): string;
}
export declare class JUMPI {
    readonly name: string;
    readonly type?: string;
    readonly wrapped: boolean;
    readonly condition: any;
    readonly location: any;
    readonly valid: boolean;
    readonly true?: any;
    readonly false?: any;
    readonly payable?: boolean;
    constructor(condition: any, location: any, ifTrue?: any, ifFalse?: any, skipped?: boolean);
    toString(): any;
}
declare const _default: (opcode: Opcode, state: EVM) => void;
export default _default;
