declare const _default: {
    STOP: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    ADD: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    MUL: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    SUB: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    DIV: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    SDIV: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    MOD: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    SMOD: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    ADDMOD: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    MULMOD: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    EXP: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    SIGNEXTEND: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    LT: (opcode: import('../interfaces/opcode.interface').default, state: import('..').EVM) => void;
    GT: (opcode: import('../interfaces/opcode.interface').default, state: import('..').EVM) => void;
    SLT: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    SGT: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    EQ: (opcode: import('../interfaces/opcode.interface').default, state: import('..').EVM) => void;
    ISZERO: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    AND: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    OR: (opcode: import('../interfaces/opcode.interface').default, state: import('..').EVM) => void;
    XOR: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    NOT: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    BYTE: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    SHL: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    SHR: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    SAR: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    SHA3: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    ADDRESS: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    BALANCE: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    ORIGIN: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    CALLER: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    CALLVALUE: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    CALLDATALOAD: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    CALLDATASIZE: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    CALLDATACOPY: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    CODESIZE: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    CODECOPY: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    GASPRICE: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    EXTCODESIZE: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    EXTCODECOPY: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    RETURNDATASIZE: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    RETURNDATACOPY: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    EXTCODEHASH: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    BLOCKHASH: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    COINBASE: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    TIMESTAMP: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    NUMBER: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    DIFFICULTY: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    GASLIMIT: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    POP: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    MLOAD: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    MSTORE: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    MSTORE8: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    SLOAD: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    SSTORE: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    JUMP: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    JUMPI: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    PC: (opcode: import('../interfaces/opcode.interface').default, state: import('..').EVM) => void;
    MSIZE: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    GAS: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    JUMPDEST: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    PUSH1: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    PUSH2: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    PUSH3: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    PUSH4: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    PUSH5: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    PUSH6: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    PUSH7: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    PUSH8: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    PUSH9: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    PUSH10: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    PUSH11: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    PUSH12: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    PUSH13: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    PUSH14: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    PUSH15: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    PUSH16: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    PUSH17: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    PUSH18: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    PUSH19: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    PUSH20: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    PUSH21: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    PUSH22: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    PUSH23: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    PUSH24: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    PUSH25: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    PUSH26: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    PUSH27: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    PUSH28: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    PUSH29: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    PUSH30: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    PUSH31: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    PUSH32: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    DUP1: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    DUP2: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    DUP3: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    DUP4: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    DUP5: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    DUP6: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    DUP7: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    DUP8: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    DUP9: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    DUP10: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    DUP11: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    DUP12: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    DUP13: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    DUP14: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    DUP15: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    DUP16: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    SWAP1: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    SWAP2: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    SWAP3: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    SWAP4: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    SWAP5: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    SWAP6: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    SWAP7: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    SWAP8: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    SWAP9: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    SWAP10: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    SWAP11: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    SWAP12: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    SWAP13: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    SWAP14: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    SWAP15: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    SWAP16: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    LOG0: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    LOG1: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    LOG2: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    LOG3: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    LOG4: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    CREATE: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    CALL: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    CALLCODE: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    RETURN: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    DELEGATECALL: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    CREATE2: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    STATICCALL: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    REVERT: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    INVALID: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
    SELFDESTRUCT: (
        opcode: import('../interfaces/opcode.interface').default,
        state: import('..').EVM
    ) => void;
};
export default _default;
