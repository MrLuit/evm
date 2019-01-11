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

export class MappingLoad {
    readonly name: string;
    readonly type?: string;
    readonly wrapped: boolean;
    readonly location: any;
    readonly count: any;
    readonly items: any;
    readonly structlocation?: any;

    constructor(location: any, items: any, count: any, structlocation?: any) {
        this.name = 'MappingLoad';
        this.wrapped = true;
        this.location = location;
        this.count = count;
        this.items = items;
        this.structlocation = structlocation;
    }

    toString() {
        if (this.structlocation) {
            return (
                'mapping' +
                (this.count + 1) +
                this.items.map((item: any) => '[' + stringify(item) + ']').join('') +
                '[' +
                this.structlocation.toString() +
                ']'
            );
        } else {
            return (
                'mapping' +
                (this.count + 1) +
                this.items.map((item: any) => '[' + stringify(item) + ']').join('')
            );
        }
    }
}

export class SLOAD {
    readonly name: string;
    readonly type?: string;
    readonly wrapped: boolean;
    readonly location: any;
    readonly storage: any;

    constructor(location: any, storage: any) {
        this.name = 'SLOAD';
        this.wrapped = true;
        this.location = location;
        this.storage = storage;
    }

    toString() {
        if (BigNumber.isInstance(this.location) && this.location.toString(16) in this.storage) {
            return this.storage[this.location.toString(16)];
        } else {
            return 'storage[' + stringify(this.location) + ']';
        }
    }
}

export default (opcode: Opcode, state: EVM): void => {
    const storeLocation = state.stack.pop();
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
            state.stack.push(
                new MappingLoad(
                    mappingLocation,
                    mappingParts,
                    Object.keys(state.mappings).indexOf(mappingLocation.toString())
                )
            );
        } else {
            state.stack.push(new SLOAD(storeLocation, state.storage));
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
            state.stack.push(
                new MappingLoad(
                    mappingLocation,
                    mappingParts,
                    Object.keys(state.mappings).indexOf(mappingLocation.toString()),
                    storeLocation.right
                )
            );
        } else {
            state.stack.push(new SLOAD(storeLocation, state.storage));
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
            state.stack.push(
                new MappingLoad(
                    mappingLocation,
                    mappingParts,
                    Object.keys(state.mappings).indexOf(mappingLocation.toString()),
                    storeLocation.left
                )
            );
        } else {
            state.stack.push(new SLOAD(storeLocation, state.storage));
        }
    } else {
        state.stack.push(new SLOAD(storeLocation, state.storage));
    }
};
