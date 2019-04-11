"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STOP = 0x00;
exports.ADD = 0x01;
exports.MUL = 0x02;
exports.SUB = 0x03;
exports.DIV = 0x04;
exports.SDIV = 0x05;
exports.MOD = 0x06;
exports.SMOD = 0x07;
exports.ADDMOD = 0x08;
exports.MULMOD = 0x09;
exports.EXP = 0x0a;
exports.SIGNEXTEND = 0x0b;
exports.LT = 0x10;
exports.GT = 0x11;
exports.SLT = 0x12;
exports.SGT = 0x13;
exports.EQ = 0x14;
exports.ISZERO = 0x15;
exports.AND = 0x16;
exports.OR = 0x17;
exports.XOR = 0x18;
exports.NOT = 0x19;
exports.BYTE = 0x1a;
exports.SHL = 0x1b;
exports.SHR = 0x1c;
exports.SAR = 0x1d;
exports.SHA3 = 0x20;
exports.ADDRESS = 0x30;
exports.BALANCE = 0x31;
exports.ORIGIN = 0x32;
exports.CALLER = 0x33;
exports.CALLVALUE = 0x34;
exports.CALLDATALOAD = 0x35;
exports.CALLDATASIZE = 0x36;
exports.CALLDATACOPY = 0x37;
exports.CODESIZE = 0x38;
exports.CODECOPY = 0x39;
exports.GASPRICE = 0x3a;
exports.EXTCODESIZE = 0x3b;
exports.EXTCODECOPY = 0x3c;
exports.RETURNDATASIZE = 0x3d;
exports.RETURNDATACOPY = 0x3e;
exports.EXTCODEHASH = 0x3f;
exports.BLOCKHASH = 0x40;
exports.COINBASE = 0x41;
exports.TIMESTAMP = 0x42;
exports.NUMBER = 0x43;
exports.DIFFICULTY = 0x44;
exports.GASLIMIT = 0x45;
exports.POP = 0x50;
exports.MLOAD = 0x51;
exports.MSTORE = 0x52;
exports.MSTORE8 = 0x53;
exports.SLOAD = 0x54;
exports.SSTORE = 0x55;
exports.JUMP = 0x56;
exports.JUMPI = 0x57;
exports.PC = 0x58;
exports.MSIZE = 0x59;
exports.GAS = 0x5a;
exports.JUMPDEST = 0x5b;
exports.PUSH1 = 0x60;
exports.PUSH2 = 0x61;
exports.PUSH3 = 0x62;
exports.PUSH4 = 0x63;
exports.PUSH5 = 0x64;
exports.PUSH6 = 0x65;
exports.PUSH7 = 0x66;
exports.PUSH8 = 0x67;
exports.PUSH9 = 0x68;
exports.PUSH10 = 0x69;
exports.PUSH11 = 0x6a;
exports.PUSH12 = 0x6b;
exports.PUSH13 = 0x6c;
exports.PUSH14 = 0x6d;
exports.PUSH15 = 0x6e;
exports.PUSH16 = 0x6f;
exports.PUSH17 = 0x70;
exports.PUSH18 = 0x71;
exports.PUSH19 = 0x72;
exports.PUSH20 = 0x73;
exports.PUSH21 = 0x74;
exports.PUSH22 = 0x75;
exports.PUSH23 = 0x76;
exports.PUSH24 = 0x77;
exports.PUSH25 = 0x78;
exports.PUSH26 = 0x79;
exports.PUSH27 = 0x7a;
exports.PUSH28 = 0x7b;
exports.PUSH29 = 0x7c;
exports.PUSH30 = 0x7d;
exports.PUSH31 = 0x7e;
exports.PUSH32 = 0x7f;
exports.DUP1 = 0x80;
exports.DUP2 = 0x81;
exports.DUP3 = 0x82;
exports.DUP4 = 0x83;
exports.DUP5 = 0x84;
exports.DUP6 = 0x85;
exports.DUP7 = 0x86;
exports.DUP8 = 0x87;
exports.DUP9 = 0x88;
exports.DUP10 = 0x89;
exports.DUP11 = 0x8a;
exports.DUP12 = 0x8b;
exports.DUP13 = 0x8c;
exports.DUP14 = 0x8d;
exports.DUP15 = 0x8e;
exports.DUP16 = 0x8f;
exports.SWAP1 = 0x90;
exports.SWAP2 = 0x91;
exports.SWAP3 = 0x92;
exports.SWAP4 = 0x93;
exports.SWAP5 = 0x94;
exports.SWAP6 = 0x95;
exports.SWAP7 = 0x96;
exports.SWAP8 = 0x97;
exports.SWAP9 = 0x98;
exports.SWAP10 = 0x99;
exports.SWAP11 = 0x9a;
exports.SWAP12 = 0x9b;
exports.SWAP13 = 0x9c;
exports.SWAP14 = 0x9d;
exports.SWAP15 = 0x9e;
exports.SWAP16 = 0x9f;
exports.LOG0 = 0xa0;
exports.LOG1 = 0xa1;
exports.LOG2 = 0xa2;
exports.LOG3 = 0xa3;
exports.LOG4 = 0xa4;
exports.CREATE = 0xf0;
exports.CALL = 0xf1;
exports.CALLCODE = 0xf2;
exports.RETURN = 0xf3;
exports.DELEGATECALL = 0xf4;
exports.CREATE2 = 0xf5;
exports.STATICCALL = 0xfa;
exports.REVERT = 0xfd;
exports.INVALID = 0xfe;
exports.SELFDESTRUCT = 0xff;
exports.codes = {
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
exports.names = {
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
exports.default = Object.assign({}, exports.codes, exports.names);
//# sourceMappingURL=opcodes.js.map