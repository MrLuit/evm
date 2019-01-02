import STOP from '../opcodes/stop';
import ADD from '../opcodes/add';
import MUL from '../opcodes/mul';
import SUB from '../opcodes/sub';
import DIV from '../opcodes/div';
import MOD from '../opcodes/mod';
import ADDMOD from '../opcodes/addmod';
import MULMOD from '../opcodes/mulmod';
import EXP from '../opcodes/exp';
import SIGNEXTEND from '../opcodes/signextend';
import LT from '../opcodes/lt';
import GT from '../opcodes/gt';
import EQ from '../opcodes/eq';
import ISZERO from '../opcodes/iszero';
import AND from '../opcodes/and';
import OR from '../opcodes/or';
import XOR from '../opcodes/xor';
import NOT from '../opcodes/not';
import BYTE from '../opcodes/byte';
import SHL from '../opcodes/shl';
import SHR from '../opcodes/shr';
import SAR from '../opcodes/sar';
import SHA3 from '../opcodes/sha3';
import ADDRESS from '../opcodes/address';
import BALANCE from '../opcodes/balance';
import ORIGIN from '../opcodes/origin';
import CALLER from '../opcodes/caller';
import CALLVALUE from '../opcodes/callvalue';
import CALLDATALOAD from '../opcodes/calldataload';
import CALLDATASIZE from '../opcodes/calldatasize';
import CALLDATACOPY from '../opcodes/calldatacopy';
import CODESIZE from '../opcodes/codesize';
import CODECOPY from '../opcodes/codecopy';
import GASPRICE from '../opcodes/gasprice';
import EXTCODESIZE from '../opcodes/extcodesize';
import EXTCODECOPY from '../opcodes/extcodecopy';
import RETURNDATASIZE from '../opcodes/returndatasize';
import RETURNDATACOPY from '../opcodes/returndatacopy';
import EXTCODEHASH from '../opcodes/extcodehash';
import BLOCKHASH from '../opcodes/blockhash';
import COINBASE from '../opcodes/coinbase';
import TIMESTAMP from '../opcodes/timestamp';
import NUMBER from '../opcodes/number';
import DIFFICULTY from '../opcodes/difficulty';
import GASLIMIT from '../opcodes/gaslimit';
import POP from '../opcodes/pop';
import MLOAD from '../opcodes/mload';
import MSTORE from '../opcodes/mstore';
import SLOAD from '../opcodes/sload';
import SSTORE from '../opcodes/sstore';
import JUMP from '../opcodes/jump';
import JUMPI from '../opcodes/jumpi';
import PC from '../opcodes/pc';
import MSIZE from '../opcodes/msize';
import GAS from '../opcodes/gas';
import JUMPDEST from '../opcodes/jumpdest';
import PUSH from '../opcodes/push';
import DUP from '../opcodes/dup';
import SWAP from '../opcodes/swap';
import LOG from '../opcodes/log';
import CREATE from '../opcodes/create';
import CALL from '../opcodes/call';
import CALLCODE from '../opcodes/callcode';
import RETURN from '../opcodes/return';
import DELEGATECALL from '../opcodes/delegatecall';
import CREATE2 from '../opcodes/create2';
import STATICCALL from '../opcodes/staticcall';
import REVERT from '../opcodes/revert';
import INVALID from '../opcodes/invalid';
import SELFDESTRUCT from '../opcodes/selfdestruct';

export default {
    STOP,
    ADD,
    MUL,
    SUB,
    DIV,
    SDIV: DIV,
    MOD,
    SMOD: MOD,
    ADDMOD,
    MULMOD,
    EXP,
    SIGNEXTEND,
    LT,
    GT,
    SLT: LT,
    SGT: GT,
    EQ,
    ISZERO,
    AND,
    OR,
    XOR,
    NOT,
    BYTE,
    SHL,
    SHR,
    SAR,
    SHA3,
    ADDRESS,
    BALANCE,
    ORIGIN,
    CALLER,
    CALLVALUE,
    CALLDATALOAD,
    CALLDATASIZE,
    CALLDATACOPY,
    CODESIZE,
    CODECOPY,
    GASPRICE,
    EXTCODESIZE,
    EXTCODECOPY,
    RETURNDATASIZE,
    RETURNDATACOPY,
    EXTCODEHASH,
    BLOCKHASH,
    COINBASE,
    TIMESTAMP,
    NUMBER,
    DIFFICULTY,
    GASLIMIT,
    POP,
    MLOAD,
    MSTORE,
    MSTORE8: MSTORE,
    SLOAD,
    SSTORE,
    JUMP,
    JUMPI,
    PC,
    MSIZE,
    GAS,
    JUMPDEST,
    PUSH1: PUSH,
    PUSH2: PUSH,
    PUSH3: PUSH,
    PUSH4: PUSH,
    PUSH5: PUSH,
    PUSH6: PUSH,
    PUSH7: PUSH,
    PUSH8: PUSH,
    PUSH9: PUSH,
    PUSH10: PUSH,
    PUSH11: PUSH,
    PUSH12: PUSH,
    PUSH13: PUSH,
    PUSH14: PUSH,
    PUSH15: PUSH,
    PUSH16: PUSH,
    PUSH17: PUSH,
    PUSH18: PUSH,
    PUSH19: PUSH,
    PUSH20: PUSH,
    PUSH21: PUSH,
    PUSH22: PUSH,
    PUSH23: PUSH,
    PUSH24: PUSH,
    PUSH25: PUSH,
    PUSH26: PUSH,
    PUSH27: PUSH,
    PUSH28: PUSH,
    PUSH29: PUSH,
    PUSH30: PUSH,
    PUSH31: PUSH,
    PUSH32: PUSH,
    DUP1: DUP,
    DUP2: DUP,
    DUP3: DUP,
    DUP4: DUP,
    DUP5: DUP,
    DUP6: DUP,
    DUP7: DUP,
    DUP8: DUP,
    DUP9: DUP,
    DUP10: DUP,
    DUP11: DUP,
    DUP12: DUP,
    DUP13: DUP,
    DUP14: DUP,
    DUP15: DUP,
    DUP16: DUP,
    SWAP1: SWAP,
    SWAP2: SWAP,
    SWAP3: SWAP,
    SWAP4: SWAP,
    SWAP5: SWAP,
    SWAP6: SWAP,
    SWAP7: SWAP,
    SWAP8: SWAP,
    SWAP9: SWAP,
    SWAP10: SWAP,
    SWAP11: SWAP,
    SWAP12: SWAP,
    SWAP13: SWAP,
    SWAP14: SWAP,
    SWAP15: SWAP,
    SWAP16: SWAP,
    LOG0: LOG,
    LOG1: LOG,
    LOG2: LOG,
    LOG3: LOG,
    LOG4: LOG,
    CREATE,
    CALL,
    CALLCODE,
    RETURN,
    DELEGATECALL,
    CREATE2,
    STATICCALL,
    REVERT,
    INVALID,
    SELFDESTRUCT
};
