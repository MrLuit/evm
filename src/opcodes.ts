export const STOP = 0x00;
export const ADD = 0x01;
export const MUL = 0x02;
export const SUB = 0x03;
export const DIV = 0x04;
export const SDIV = 0x05;
export const MOD = 0x06;
export const SMOD = 0x07;
export const ADDMOD = 0x08;
export const MULMOD = 0x09;
export const EXP = 0x0a;
export const SIGNEXTEND = 0x0b;
export const LT = 0x10;
export const GT = 0x11;
export const SLT = 0x12;
export const SGT = 0x13;
export const EQ = 0x14;
export const ISZERO = 0x15;
export const AND = 0x16;
export const OR = 0x17;
export const XOR = 0x18;
export const NOT = 0x19;
export const BYTE = 0x1a;
export const SHL = 0x1b;
export const SHR = 0x1c;
export const SAR = 0x1d;
export const SHA3 = 0x20;
export const ADDRESS = 0x30;
export const BALANCE = 0x31;
export const ORIGIN = 0x32;
export const CALLER = 0x33;
export const CALLVALUE = 0x34;
export const CALLDATALOAD = 0x35;
export const CALLDATASIZE = 0x36;
export const CALLDATACOPY = 0x37;
export const CODESIZE = 0x38;
export const CODECOPY = 0x39;
export const GASPRICE = 0x3a;
export const EXTCODESIZE = 0x3b;
export const EXTCODECOPY = 0x3c;
export const RETURNDATASIZE = 0x3d;
export const RETURNDATACOPY = 0x3e;
export const EXTCODEHASH = 0x3f;
export const BLOCKHASH = 0x40;
export const COINBASE = 0x41;
export const TIMESTAMP = 0x42;
export const NUMBER = 0x43;
export const DIFFICULTY = 0x44;
export const GASLIMIT = 0x45;
export const POP = 0x50;
export const MLOAD = 0x51;
export const MSTORE = 0x52;
export const MSTORE8 = 0x53;
export const SLOAD = 0x54;
export const SSTORE = 0x55;
export const JUMP = 0x56;
export const JUMPI = 0x57;
export const PC = 0x58;
export const MSIZE = 0x59;
export const GAS = 0x5a;
export const JUMPDEST = 0x5b;
export const PUSH1 = 0x60;
export const PUSH2 = 0x61;
export const PUSH3 = 0x62;
export const PUSH4 = 0x63;
export const PUSH5 = 0x64;
export const PUSH6 = 0x65;
export const PUSH7 = 0x66;
export const PUSH8 = 0x67;
export const PUSH9 = 0x68;
export const PUSH10 = 0x69;
export const PUSH11 = 0x6a;
export const PUSH12 = 0x6b;
export const PUSH13 = 0x6c;
export const PUSH14 = 0x6d;
export const PUSH15 = 0x6e;
export const PUSH16 = 0x6f;
export const PUSH17 = 0x70;
export const PUSH18 = 0x71;
export const PUSH19 = 0x72;
export const PUSH20 = 0x73;
export const PUSH21 = 0x74;
export const PUSH22 = 0x75;
export const PUSH23 = 0x76;
export const PUSH24 = 0x77;
export const PUSH25 = 0x78;
export const PUSH26 = 0x79;
export const PUSH27 = 0x7a;
export const PUSH28 = 0x7b;
export const PUSH29 = 0x7c;
export const PUSH30 = 0x7d;
export const PUSH31 = 0x7e;
export const PUSH32 = 0x7f;
export const DUP1 = 0x80;
export const DUP2 = 0x81;
export const DUP3 = 0x82;
export const DUP4 = 0x83;
export const DUP5 = 0x84;
export const DUP6 = 0x85;
export const DUP7 = 0x86;
export const DUP8 = 0x87;
export const DUP9 = 0x88;
export const DUP10 = 0x89;
export const DUP11 = 0x8a;
export const DUP12 = 0x8b;
export const DUP13 = 0x8c;
export const DUP14 = 0x8d;
export const DUP15 = 0x8e;
export const DUP16 = 0x8f;
export const SWAP1 = 0x90;
export const SWAP2 = 0x91;
export const SWAP3 = 0x92;
export const SWAP4 = 0x93;
export const SWAP5 = 0x94;
export const SWAP6 = 0x95;
export const SWAP7 = 0x96;
export const SWAP8 = 0x97;
export const SWAP9 = 0x98;
export const SWAP10 = 0x99;
export const SWAP11 = 0x9a;
export const SWAP12 = 0x9b;
export const SWAP13 = 0x9c;
export const SWAP14 = 0x9d;
export const SWAP15 = 0x9e;
export const SWAP16 = 0x9f;
export const LOG0 = 0xa0;
export const LOG1 = 0xa1;
export const LOG2 = 0xa2;
export const LOG3 = 0xa3;
export const LOG4 = 0xa4;
export const CREATE = 0xf0;
export const CALL = 0xf1;
export const CALLCODE = 0xf2;
export const RETURN = 0xf3;
export const DELEGATECALL = 0xf4;
export const CREATE2 = 0xf5;
export const STATICCALL = 0xfa;
export const REVERT = 0xfd;
export const INVALID = 0xfe;
export const SELFDESTRUCT = 0xff;

export const codes = {
    0x00: 'STOP',
    0x01: 'ADD',
    0x02: 'MUL',
    0x03: 'SUB',
    0x04: 'DIV',
    0x05: 'SDIV',
    0x06: 'MOD',
    0x07: 'SMOD',
    0x08: 'ADDMOD',
    0x09: 'MULMOD',
    0x0a: 'EXP',
    0x0b: 'SIGNEXTEND',
    0x10: 'LT',
    0x11: 'GT',
    0x12: 'SLT',
    0x13: 'SGT',
    0x14: 'EQ',
    0x15: 'ISZERO',
    0x16: 'AND',
    0x17: 'OR',
    0x18: 'XOR',
    0x19: 'NOT',
    0x1a: 'BYTE',
    0x1b: 'SHL',
    0x1c: 'SHR',
    0x1d: 'SAR',
    0x20: 'SHA3',
    0x30: 'ADDRESS',
    0x31: 'BALANCE',
    0x32: 'ORIGIN',
    0x33: 'CALLER',
    0x34: 'CALLVALUE',
    0x35: 'CALLDATALOAD',
    0x36: 'CALLDATASIZE',
    0x37: 'CALLDATACOPY',
    0x38: 'CODESIZE',
    0x39: 'CODECOPY',
    0x3a: 'GASPRICE',
    0x3b: 'EXTCODESIZE',
    0x3c: 'EXTCODECOPY',
    0x3d: 'RETURNDATASIZE',
    0x3e: 'RETURNDATACOPY',
    0x3f: 'EXTCODEHASH',
    0x40: 'BLOCKHASH',
    0x41: 'COINBASE',
    0x42: 'TIMESTAMP',
    0x43: 'NUMBER',
    0x44: 'DIFFICULTY',
    0x45: 'GASLIMIT',
    0x50: 'POP',
    0x51: 'MLOAD',
    0x52: 'MSTORE',
    0x53: 'MSTORE8',
    0x54: 'SLOAD',
    0x55: 'SSTORE',
    0x56: 'JUMP',
    0x57: 'JUMPI',
    0x58: 'PC',
    0x59: 'MSIZE',
    0x5a: 'GAS',
    0x5b: 'JUMPDEST',
    0x60: 'PUSH1',
    0x61: 'PUSH2',
    0x62: 'PUSH3',
    0x63: 'PUSH4',
    0x64: 'PUSH5',
    0x65: 'PUSH6',
    0x66: 'PUSH7',
    0x67: 'PUSH8',
    0x68: 'PUSH9',
    0x69: 'PUSH10',
    0x6a: 'PUSH11',
    0x6b: 'PUSH12',
    0x6c: 'PUSH13',
    0x6d: 'PUSH14',
    0x6e: 'PUSH15',
    0x6f: 'PUSH16',
    0x70: 'PUSH17',
    0x71: 'PUSH18',
    0x72: 'PUSH19',
    0x73: 'PUSH20',
    0x74: 'PUSH21',
    0x75: 'PUSH22',
    0x76: 'PUSH23',
    0x77: 'PUSH24',
    0x78: 'PUSH25',
    0x79: 'PUSH26',
    0x7a: 'PUSH27',
    0x7b: 'PUSH28',
    0x7c: 'PUSH29',
    0x7d: 'PUSH30',
    0x7e: 'PUSH31',
    0x7f: 'PUSH32',
    0x80: 'DUP1',
    0x81: 'DUP2',
    0x82: 'DUP3',
    0x83: 'DUP4',
    0x84: 'DUP5',
    0x85: 'DUP6',
    0x86: 'DUP7',
    0x87: 'DUP8',
    0x88: 'DUP9',
    0x89: 'DUP10',
    0x8a: 'DUP11',
    0x8b: 'DUP12',
    0x8c: 'DUP13',
    0x8d: 'DUP14',
    0x8e: 'DUP15',
    0x8f: 'DUP16',
    0x90: 'SWAP1',
    0x91: 'SWAP2',
    0x92: 'SWAP3',
    0x93: 'SWAP4',
    0x94: 'SWAP5',
    0x95: 'SWAP6',
    0x96: 'SWAP7',
    0x97: 'SWAP8',
    0x98: 'SWAP9',
    0x99: 'SWAP10',
    0x9a: 'SWAP11',
    0x9b: 'SWAP12',
    0x9c: 'SWAP13',
    0x9d: 'SWAP14',
    0x9e: 'SWAP15',
    0x9f: 'SWAP16',
    0xa0: 'LOG0',
    0xa1: 'LOG1',
    0xa2: 'LOG2',
    0xa3: 'LOG3',
    0xa4: 'LOG4',
    0xf0: 'CREATE',
    0xf1: 'CALL',
    0xf2: 'CALLCODE',
    0xf3: 'RETURN',
    0xf4: 'DELEGATECALL',
    0xf5: 'CREATE2',
    0xfa: 'STATICCALL',
    0xfd: 'REVERT',
    0xfe: 'INVALID',
    0xff: 'SELFDESTRUCT'
};

export const names = {
    STOP: 0x00,
    ADD: 0x01,
    MUL: 0x02,
    SUB: 0x03,
    DIV: 0x04,
    SDIV: 0x05,
    MOD: 0x06,
    SMOD: 0x07,
    ADDMOD: 0x08,
    MULMOD: 0x09,
    EXP: 0x0a,
    SIGNEXTEND: 0x0b,
    LT: 0x10,
    GT: 0x11,
    SLT: 0x12,
    SGT: 0x13,
    EQ: 0x14,
    ISZERO: 0x15,
    AND: 0x16,
    OR: 0x17,
    XOR: 0x18,
    NOT: 0x19,
    BYTE: 0x1a,
    SHL: 0x1b,
    SHR: 0x1c,
    SAR: 0x1d,
    SHA3: 0x20,
    ADDRESS: 0x30,
    BALANCE: 0x31,
    ORIGIN: 0x32,
    CALLER: 0x33,
    CALLVALUE: 0x34,
    CALLDATALOAD: 0x35,
    CALLDATASIZE: 0x36,
    CALLDATACOPY: 0x37,
    CODESIZE: 0x38,
    CODECOPY: 0x39,
    GASPRICE: 0x3a,
    EXTCODESIZE: 0x3b,
    EXTCODECOPY: 0x3c,
    RETURNDATASIZE: 0x3d,
    RETURNDATACOPY: 0x3e,
    EXTCODEHASH: 0x3f,
    BLOCKHASH: 0x40,
    COINBASE: 0x41,
    TIMESTAMP: 0x42,
    NUMBER: 0x43,
    DIFFICULTY: 0x44,
    GASLIMIT: 0x45,
    POP: 0x50,
    MLOAD: 0x51,
    MSTORE: 0x52,
    MSTORE8: 0x53,
    SLOAD: 0x54,
    SSTORE: 0x55,
    JUMP: 0x56,
    JUMPI: 0x57,
    PC: 0x58,
    MSIZE: 0x59,
    GAS: 0x5a,
    JUMPDEST: 0x5b,
    PUSH1: 0x60,
    PUSH2: 0x61,
    PUSH3: 0x62,
    PUSH4: 0x63,
    PUSH5: 0x64,
    PUSH6: 0x65,
    PUSH7: 0x66,
    PUSH8: 0x67,
    PUSH9: 0x68,
    PUSH10: 0x69,
    PUSH11: 0x6a,
    PUSH12: 0x6b,
    PUSH13: 0x6c,
    PUSH14: 0x6d,
    PUSH15: 0x6e,
    PUSH16: 0x6f,
    PUSH17: 0x70,
    PUSH18: 0x71,
    PUSH19: 0x72,
    PUSH20: 0x73,
    PUSH21: 0x74,
    PUSH22: 0x75,
    PUSH23: 0x76,
    PUSH24: 0x77,
    PUSH25: 0x78,
    PUSH26: 0x79,
    PUSH27: 0x7a,
    PUSH28: 0x7b,
    PUSH29: 0x7c,
    PUSH30: 0x7d,
    PUSH31: 0x7e,
    PUSH32: 0x7f,
    DUP1: 0x80,
    DUP2: 0x81,
    DUP3: 0x82,
    DUP4: 0x83,
    DUP5: 0x84,
    DUP6: 0x85,
    DUP7: 0x86,
    DUP8: 0x87,
    DUP9: 0x88,
    DUP10: 0x89,
    DUP11: 0x8a,
    DUP12: 0x8b,
    DUP13: 0x8c,
    DUP14: 0x8d,
    DUP15: 0x8e,
    DUP16: 0x8f,
    SWAP1: 0x90,
    SWAP2: 0x91,
    SWAP3: 0x92,
    SWAP4: 0x93,
    SWAP5: 0x94,
    SWAP6: 0x95,
    SWAP7: 0x96,
    SWAP8: 0x97,
    SWAP9: 0x98,
    SWAP10: 0x99,
    SWAP11: 0x9a,
    SWAP12: 0x9b,
    SWAP13: 0x9c,
    SWAP14: 0x9d,
    SWAP15: 0x9e,
    SWAP16: 0x9f,
    LOG0: 0xa0,
    LOG1: 0xa1,
    LOG2: 0xa2,
    LOG3: 0xa3,
    LOG4: 0xa4,
    CREATE: 0xf0,
    CALL: 0xf1,
    CALLCODE: 0xf2,
    RETURN: 0xf3,
    DELEGATECALL: 0xf4,
    CREATE2: 0xf5,
    STATICCALL: 0xfa,
    REVERT: 0xfd,
    INVALID: 0xfe,
    SELFDESTRUCT: 0xff
};

export default {
    ...codes,
    ...names
};
