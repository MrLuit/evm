"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BigNumber = require("../../node_modules/big-integer");
const stringify_1 = require("../utils/stringify");
const parseMapping = (...items) => {
    const mappings = [];
    items.forEach((item2) => {
        if (item2.name === 'SHA3' && item2.items) {
            mappings.push(...parseMapping(...item2.items));
        }
        else {
            mappings.push(item2);
        }
    });
    return mappings;
};
class MappingLoad {
    constructor(mappings, location, items, count, structlocation) {
        this.name = 'MappingLoad';
        this.wrapped = false;
        this.location = location;
        this.count = count;
        this.items = items;
        this.structlocation = structlocation;
        this.mappings = mappings;
    }
    toString() {
        let mappingName = 'mapping' + (this.count + 1);
        if (this.location in this.mappings() && this.mappings()[this.location].name) {
            mappingName = this.mappings()[this.location].name;
        }
        if (this.structlocation) {
            return (mappingName +
                this.items.map((item) => '[' + stringify_1.default(item) + ']').join('') +
                '[' +
                this.structlocation.toString() +
                ']');
        }
        else {
            return (mappingName + this.items.map((item) => '[' + stringify_1.default(item) + ']').join(''));
        }
    }
}
exports.MappingLoad = MappingLoad;
class SLOAD {
    constructor(location, variables) {
        this.name = 'SLOAD';
        this.wrapped = false;
        this.location = location;
        this.variables = variables;
    }
    toString() {
        if (BigNumber.isInstance(this.location) && this.location.toString() in this.variables()) {
            if (this.variables()[this.location.toString()].label) {
                return this.variables()[this.location.toString()].label;
            }
            else {
                return ('var' + (Object.keys(this.variables()).indexOf(this.location.toString()) + 1));
            }
        }
        else {
            return 'storage[' + stringify_1.default(this.location) + ']';
        }
    }
}
exports.SLOAD = SLOAD;
exports.default = (opcode, state) => {
    const storeLocation = state.stack.pop();
    if (storeLocation.name === 'SHA3') {
        const mappingItems = parseMapping(...storeLocation.items);
        const mappingLocation = mappingItems.find((mappingItem) => BigNumber.isInstance(mappingItem));
        const mappingParts = mappingItems.filter((mappingItem) => !BigNumber.isInstance(mappingItem));
        if (mappingLocation && mappingParts.length > 0) {
            if (!(mappingLocation in state.mappings)) {
                state.mappings[mappingLocation] = {
                    name: false,
                    structs: [],
                    keys: [],
                    values: []
                };
            }
            state.mappings[mappingLocation].keys.push(mappingParts);
            state.stack.push(new MappingLoad(() => state.mappings, mappingLocation, mappingParts, Object.keys(state.mappings).indexOf(mappingLocation.toString())));
        }
        else {
            state.stack.push(new SLOAD(storeLocation, () => state.variables));
        }
    }
    else if (storeLocation.name === 'ADD' &&
        storeLocation.left.name === 'SHA3' &&
        BigNumber.isInstance(storeLocation.right)) {
        const mappingItems = parseMapping(...storeLocation.left.items);
        const mappingLocation = mappingItems.find((mappingItem) => BigNumber.isInstance(mappingItem));
        const mappingParts = mappingItems.filter((mappingItem) => !BigNumber.isInstance(mappingItem));
        if (mappingLocation && mappingParts.length > 0) {
            if (!(mappingLocation in state.mappings)) {
                state.mappings[mappingLocation] = {
                    name: false,
                    structs: [],
                    keys: [],
                    values: []
                };
            }
            state.mappings[mappingLocation].keys.push(mappingParts);
            state.stack.push(new MappingLoad(() => state.mappings, mappingLocation, mappingParts, Object.keys(state.mappings).indexOf(mappingLocation.toString()), storeLocation.right));
        }
        else {
            state.stack.push(new SLOAD(storeLocation, () => state.variables));
        }
    }
    else if (storeLocation.name === 'ADD' &&
        BigNumber.isInstance(storeLocation.left) &&
        storeLocation.right.name === 'SHA3') {
        const mappingItems = parseMapping(...storeLocation.right.items);
        const mappingLocation = mappingItems.find((mappingItem) => BigNumber.isInstance(mappingItem));
        const mappingParts = mappingItems.filter((mappingItem) => !BigNumber.isInstance(mappingItem));
        if (mappingLocation && mappingParts.length > 0) {
            if (!(mappingLocation in state.mappings)) {
                state.mappings[mappingLocation] = {
                    name: false,
                    structs: [],
                    keys: [],
                    values: []
                };
            }
            state.mappings[mappingLocation].keys.push(mappingParts);
            state.stack.push(new MappingLoad(() => state.mappings, mappingLocation, mappingParts, Object.keys(state.mappings).indexOf(mappingLocation.toString()), storeLocation.left));
        }
        else {
            state.stack.push(new SLOAD(storeLocation, () => state.variables));
        }
    }
    else {
        state.stack.push(new SLOAD(storeLocation, () => state.variables));
    }
};
//# sourceMappingURL=sload.js.map