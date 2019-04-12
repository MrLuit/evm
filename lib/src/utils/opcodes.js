"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stop_1 = require("../opcodes/stop");
const add_1 = require("../opcodes/add");
const mul_1 = require("../opcodes/mul");
const sub_1 = require("../opcodes/sub");
const div_1 = require("../opcodes/div");
const mod_1 = require("../opcodes/mod");
const addmod_1 = require("../opcodes/addmod");
const mulmod_1 = require("../opcodes/mulmod");
const exp_1 = require("../opcodes/exp");
const signextend_1 = require("../opcodes/signextend");
const lt_1 = require("../opcodes/lt");
const gt_1 = require("../opcodes/gt");
const eq_1 = require("../opcodes/eq");
const iszero_1 = require("../opcodes/iszero");
const and_1 = require("../opcodes/and");
const or_1 = require("../opcodes/or");
const xor_1 = require("../opcodes/xor");
const not_1 = require("../opcodes/not");
const byte_1 = require("../opcodes/byte");
const shl_1 = require("../opcodes/shl");
const shr_1 = require("../opcodes/shr");
const sar_1 = require("../opcodes/sar");
const sha3_1 = require("../opcodes/sha3");
const address_1 = require("../opcodes/address");
const balance_1 = require("../opcodes/balance");
const origin_1 = require("../opcodes/origin");
const caller_1 = require("../opcodes/caller");
const callvalue_1 = require("../opcodes/callvalue");
const calldataload_1 = require("../opcodes/calldataload");
const calldatasize_1 = require("../opcodes/calldatasize");
const calldatacopy_1 = require("../opcodes/calldatacopy");
const codesize_1 = require("../opcodes/codesize");
const codecopy_1 = require("../opcodes/codecopy");
const gasprice_1 = require("../opcodes/gasprice");
const extcodesize_1 = require("../opcodes/extcodesize");
const extcodecopy_1 = require("../opcodes/extcodecopy");
const returndatasize_1 = require("../opcodes/returndatasize");
const returndatacopy_1 = require("../opcodes/returndatacopy");
const extcodehash_1 = require("../opcodes/extcodehash");
const blockhash_1 = require("../opcodes/blockhash");
const coinbase_1 = require("../opcodes/coinbase");
const timestamp_1 = require("../opcodes/timestamp");
const number_1 = require("../opcodes/number");
const difficulty_1 = require("../opcodes/difficulty");
const gaslimit_1 = require("../opcodes/gaslimit");
const pop_1 = require("../opcodes/pop");
const mload_1 = require("../opcodes/mload");
const mstore_1 = require("../opcodes/mstore");
const sload_1 = require("../opcodes/sload");
const sstore_1 = require("../opcodes/sstore");
const jump_1 = require("../opcodes/jump");
const jumpi_1 = require("../opcodes/jumpi");
const pc_1 = require("../opcodes/pc");
const msize_1 = require("../opcodes/msize");
const gas_1 = require("../opcodes/gas");
const jumpdest_1 = require("../opcodes/jumpdest");
const push_1 = require("../opcodes/push");
const dup_1 = require("../opcodes/dup");
const swap_1 = require("../opcodes/swap");
const log_1 = require("../opcodes/log");
const create_1 = require("../opcodes/create");
const call_1 = require("../opcodes/call");
const callcode_1 = require("../opcodes/callcode");
const return_1 = require("../opcodes/return");
const delegatecall_1 = require("../opcodes/delegatecall");
const create2_1 = require("../opcodes/create2");
const staticcall_1 = require("../opcodes/staticcall");
const revert_1 = require("../opcodes/revert");
const invalid_1 = require("../opcodes/invalid");
const selfdestruct_1 = require("../opcodes/selfdestruct");
exports.default = {
    STOP: stop_1.default,
    ADD: add_1.default,
    MUL: mul_1.default,
    SUB: sub_1.default,
    DIV: div_1.default,
    SDIV: div_1.default,
    MOD: mod_1.default,
    SMOD: mod_1.default,
    ADDMOD: addmod_1.default,
    MULMOD: mulmod_1.default,
    EXP: exp_1.default,
    SIGNEXTEND: signextend_1.default,
    LT: lt_1.default,
    GT: gt_1.default,
    SLT: lt_1.default,
    SGT: gt_1.default,
    EQ: eq_1.default,
    ISZERO: iszero_1.default,
    AND: and_1.default,
    OR: or_1.default,
    XOR: xor_1.default,
    NOT: not_1.default,
    BYTE: byte_1.default,
    SHL: shl_1.default,
    SHR: shr_1.default,
    SAR: sar_1.default,
    SHA3: sha3_1.default,
    ADDRESS: address_1.default,
    BALANCE: balance_1.default,
    ORIGIN: origin_1.default,
    CALLER: caller_1.default,
    CALLVALUE: callvalue_1.default,
    CALLDATALOAD: calldataload_1.default,
    CALLDATASIZE: calldatasize_1.default,
    CALLDATACOPY: calldatacopy_1.default,
    CODESIZE: codesize_1.default,
    CODECOPY: codecopy_1.default,
    GASPRICE: gasprice_1.default,
    EXTCODESIZE: extcodesize_1.default,
    EXTCODECOPY: extcodecopy_1.default,
    RETURNDATASIZE: returndatasize_1.default,
    RETURNDATACOPY: returndatacopy_1.default,
    EXTCODEHASH: extcodehash_1.default,
    BLOCKHASH: blockhash_1.default,
    COINBASE: coinbase_1.default,
    TIMESTAMP: timestamp_1.default,
    NUMBER: number_1.default,
    DIFFICULTY: difficulty_1.default,
    GASLIMIT: gaslimit_1.default,
    POP: pop_1.default,
    MLOAD: mload_1.default,
    MSTORE: mstore_1.default,
    MSTORE8: mstore_1.default,
    SLOAD: sload_1.default,
    SSTORE: sstore_1.default,
    JUMP: jump_1.default,
    JUMPI: jumpi_1.default,
    PC: pc_1.default,
    MSIZE: msize_1.default,
    GAS: gas_1.default,
    JUMPDEST: jumpdest_1.default,
    PUSH1: push_1.default,
    PUSH2: push_1.default,
    PUSH3: push_1.default,
    PUSH4: push_1.default,
    PUSH5: push_1.default,
    PUSH6: push_1.default,
    PUSH7: push_1.default,
    PUSH8: push_1.default,
    PUSH9: push_1.default,
    PUSH10: push_1.default,
    PUSH11: push_1.default,
    PUSH12: push_1.default,
    PUSH13: push_1.default,
    PUSH14: push_1.default,
    PUSH15: push_1.default,
    PUSH16: push_1.default,
    PUSH17: push_1.default,
    PUSH18: push_1.default,
    PUSH19: push_1.default,
    PUSH20: push_1.default,
    PUSH21: push_1.default,
    PUSH22: push_1.default,
    PUSH23: push_1.default,
    PUSH24: push_1.default,
    PUSH25: push_1.default,
    PUSH26: push_1.default,
    PUSH27: push_1.default,
    PUSH28: push_1.default,
    PUSH29: push_1.default,
    PUSH30: push_1.default,
    PUSH31: push_1.default,
    PUSH32: push_1.default,
    DUP1: dup_1.default,
    DUP2: dup_1.default,
    DUP3: dup_1.default,
    DUP4: dup_1.default,
    DUP5: dup_1.default,
    DUP6: dup_1.default,
    DUP7: dup_1.default,
    DUP8: dup_1.default,
    DUP9: dup_1.default,
    DUP10: dup_1.default,
    DUP11: dup_1.default,
    DUP12: dup_1.default,
    DUP13: dup_1.default,
    DUP14: dup_1.default,
    DUP15: dup_1.default,
    DUP16: dup_1.default,
    SWAP1: swap_1.default,
    SWAP2: swap_1.default,
    SWAP3: swap_1.default,
    SWAP4: swap_1.default,
    SWAP5: swap_1.default,
    SWAP6: swap_1.default,
    SWAP7: swap_1.default,
    SWAP8: swap_1.default,
    SWAP9: swap_1.default,
    SWAP10: swap_1.default,
    SWAP11: swap_1.default,
    SWAP12: swap_1.default,
    SWAP13: swap_1.default,
    SWAP14: swap_1.default,
    SWAP15: swap_1.default,
    SWAP16: swap_1.default,
    LOG0: log_1.default,
    LOG1: log_1.default,
    LOG2: log_1.default,
    LOG3: log_1.default,
    LOG4: log_1.default,
    CREATE: create_1.default,
    CALL: call_1.default,
    CALLCODE: callcode_1.default,
    RETURN: return_1.default,
    DELEGATECALL: delegatecall_1.default,
    CREATE2: create2_1.default,
    STATICCALL: staticcall_1.default,
    REVERT: revert_1.default,
    INVALID: invalid_1.default,
    SELFDESTRUCT: selfdestruct_1.default
};
//# sourceMappingURL=opcodes.js.map