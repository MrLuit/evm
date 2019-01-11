import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import * as BigNumber from '../../node_modules/big-integer';
import stringify from '../utils/stringify';

const parseMapping = (...items: any[]) => {
    const mappings: any = [];
    items.forEach((item2: any) => {
        if (item2.name === 'SHA3') {
            mappings.push(...parseMapping(...item2.items));
        } else {
            mappings.push(item2);
        }
    });
    return mappings;
};

export class MappingStore {
    readonly name: string;
    readonly type?: string;
    readonly wrapped: boolean;
    readonly location: any;
    readonly count: any;
    readonly items: any;
    readonly data: any;
    readonly structlocation?: any;

    constructor(location: any, items: any, data: any, count: any, structlocation?: any) {
        this.name = 'MappingStore';
        this.wrapped = true;
        this.location = location;
        this.items = items;
        this.data = data;
        this.count = count;
        this.structlocation = structlocation;
    }

    toString() {
        if (
            this.data.name === 'ADD' &&
            this.data.right.name === 'MappingLoad' &&
            stringify(this.data.right.location) === stringify(this.location)
        ) {
            return (
                'mapping' +
                (this.count + 1) +
                this.items.map((item: any) => '[' + stringify(item) + ']').join('') +
                ' += ' +
                stringify(this.data.left) +
                ';'
            );
        } else if (
            this.data.name === 'SUB' &&
            this.data.left.name === 'MappingLoad' &&
            stringify(this.data.left.location) === stringify(this.location)
        ) {
            return (
                'mapping' +
                (this.count + 1) +
                this.items.map((item: any) => '[' + stringify(item) + ']').join('') +
                ' -= ' +
                stringify(this.data.right) +
                ';'
            );
        } else {
            return (
                'mapping' +
                (this.count + 1) +
                this.items.map((item: any) => '[' + stringify(item) + ']').join('') +
                ' = ' +
                stringify(this.data) +
                ';'
            );
        }
    }
}

export class SSTORE {
    readonly name: string;
    readonly type?: string;
    readonly wrapped: boolean;
    readonly location: any;
    readonly data: any;
    readonly storage: any;

    constructor(location: any, data: any, storage: any) {
        this.name = 'SSTORE';
        this.wrapped = false;
        this.location = location;
        this.data = data;
        this.storage = storage;
    }

    toString() {
        if (
            this.data.name === 'ADD' &&
            this.data.right.name === 'SLOAD' &&
            stringify(this.data.right.location) === stringify(this.location)
        ) {
            if (BigNumber.isInstance(this.location) && this.location.toString(16) in this.storage) {
                return (
                    this.storage[this.location.toString(16)] +
                    ' += ' +
                    stringify(this.data.left) +
                    ';'
                );
            } else {
                return (
                    'storage[' +
                    stringify(this.location) +
                    '] += ' +
                    stringify(this.data.left) +
                    ';'
                );
            }
        } else if (
            this.data.name === 'SUB' &&
            this.data.left.name === 'SLOAD' &&
            stringify(this.data.left.location) === stringify(this.location)
        ) {
            if (BigNumber.isInstance(this.location) && this.location.toString(16) in this.storage) {
                return (
                    this.storage[this.location.toString(16)] +
                    ' -= ' +
                    stringify(this.data.right) +
                    ';'
                );
            } else {
                return (
                    'storage[' +
                    stringify(this.location) +
                    '] -= ' +
                    stringify(this.data.right) +
                    ';'
                );
            }
        } else if (
            BigNumber.isInstance(this.location) &&
            this.location.toString(16) in this.storage
        ) {
            return this.storage[this.location.toString(16)] + ' = ' + stringify(this.data) + ';';
        } else {
            return 'storage[' + stringify(this.location) + '] = ' + stringify(this.data) + ';';
        }
    }
}

export default (opcode: Opcode, state: EVM): void => {
    const storeLocation = state.stack.pop();
    const storeData = state.stack.pop();
    if (storeLocation.name === 'SHA3') {
        const mappingItems = parseMapping(...storeLocation.items);
        const mappingLocation = mappingItems.find((mappingItem: any) =>
            BigNumber.isInstance(mappingItem)
        );
        const mappingParts = mappingItems.filter(
            (mappingItem: any) => !BigNumber.isInstance(mappingItem)
        );
        if (mappingLocation && mappingParts.length > 0) {
            if (!(mappingLocation in state.mappings)) {
                state.mappings[mappingLocation] = { keys: [], values: [] };
            }
            state.mappings[mappingLocation].keys.push(mappingParts);
            state.mappings[mappingLocation].values.push(storeData);
            state.instructions.push(
                new MappingStore(
                    mappingLocation,
                    mappingParts,
                    storeData,
                    Object.keys(state.mappings).indexOf(mappingLocation.toString())
                )
            );
        } else {
            state.instructions.push(new SSTORE(storeLocation, storeData, state.storage));
        }
    } else if (
        storeLocation.name === 'ADD' &&
        storeLocation.left.name === 'SHA3' &&
        BigNumber.isInstance(storeLocation.right)
    ) {
        const mappingItems = parseMapping(...storeLocation.left.items);
        const mappingLocation = mappingItems.find((mappingItem: any) =>
            BigNumber.isInstance(mappingItem)
        );
        const mappingParts = mappingItems.filter(
            (mappingItem: any) => !BigNumber.isInstance(mappingItem)
        );
        if (mappingLocation && mappingParts.length > 0) {
            if (!(mappingLocation in state.mappings)) {
                state.mappings[mappingLocation] = { keys: [], values: [] };
            }
            state.mappings[mappingLocation].keys.push(mappingParts);
            state.instructions.push(
                new MappingStore(
                    mappingLocation,
                    mappingParts,
                    storeData,
                    Object.keys(state.mappings).indexOf(mappingLocation.toString()),
                    storeLocation.right
                )
            );
        } else {
            state.instructions.push(new SSTORE(storeLocation, storeData, state.storage));
        }
    } else if (
        storeLocation.name === 'ADD' &&
        BigNumber.isInstance(storeLocation.left) &&
        storeLocation.right.name === 'SHA3'
    ) {
        const mappingItems = parseMapping(...storeLocation.right.items);
        const mappingLocation = mappingItems.find((mappingItem: any) =>
            BigNumber.isInstance(mappingItem)
        );
        const mappingParts = mappingItems.filter(
            (mappingItem: any) => !BigNumber.isInstance(mappingItem)
        );
        if (mappingLocation && mappingParts.length > 0) {
            if (!(mappingLocation in state.mappings)) {
                state.mappings[mappingLocation] = { keys: [], values: [] };
            }
            state.mappings[mappingLocation].keys.push(mappingParts);
            state.instructions.push(
                new MappingStore(
                    mappingLocation,
                    mappingParts,
                    storeData,
                    Object.keys(state.mappings).indexOf(mappingLocation.toString()),
                    storeLocation.left
                )
            );
        } else {
            state.instructions.push(new SSTORE(storeLocation, storeData, state.storage));
        }
    } else {
        state.instructions.push(new SSTORE(storeLocation, storeData, state.storage));
    }
};
