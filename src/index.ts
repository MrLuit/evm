import * as _functions from '../data/functions.json';
import * as _events from '../data/events.json';
import * as _functionHashes from '../data/functionHashes.json';
import * as _eventHashes from '../data/eventHashes.json';
import Transaction from './classes/tx.class';
import EVM from './classes/evm.class';

export const functions: any = _functions as any;
export const events: any = _events as any;
export const functionHashes: any = _functionHashes as any;
export const eventHashes: any = _eventHashes as any;

export { EVM, Transaction };
