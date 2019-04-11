"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BigNumber = require("../../node_modules/big-integer");
const stringify_1 = require("../utils/stringify");
const jumpi_1 = require("./jumpi");
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
class MappingStore {
    constructor(mappings, location, items, data, count, structlocation) {
        this.name = 'MappingStore';
        this.wrapped = false;
        this.location = location;
        this.items = items;
        this.data = data;
        this.count = count;
        this.structlocation = structlocation;
        this.mappings = mappings;
    }
    toString() {
        //console.log(this);
        let mappingName = 'mapping' + (this.count + 1);
        if (this.location in this.mappings() && this.mappings()[this.location].name) {
            mappingName = this.mappings()[this.location].name;
        }
        if (this.data.name === 'ADD' &&
            this.data.right.name === 'MappingLoad' &&
            stringify_1.default(this.data.right.location) === stringify_1.default(this.location)) {
            console.log(this.items);
            return (mappingName +
                this.items.map((item) => '[' + stringify_1.default(item) + ']').join('') +
                ' += ' +
                stringify_1.default(this.data.left) +
                ';');
        }
        else if (this.data.name === 'ADD' &&
            this.data.left.name === 'MappingLoad' &&
            stringify_1.default(this.data.left.location) === stringify_1.default(this.location)) {
            console.log(this.items);
            return (mappingName +
                this.items.map((item) => '[' + stringify_1.default(item) + ']').join('') +
                ' += ' +
                stringify_1.default(this.data.right) +
                ';');
        }
        else if (this.data.name === 'SUB' &&
            this.data.left.name === 'MappingLoad' &&
            stringify_1.default(this.data.left.location) === stringify_1.default(this.location)) {
            return (mappingName +
                this.items.map((item) => '[' + stringify_1.default(item) + ']').join('') +
                ' -= ' +
                stringify_1.default(this.data.right) +
                ';');
        }
        else {
            return (mappingName +
                this.items.map((item) => '[' + stringify_1.default(item) + ']').join('') +
                ' = ' +
                stringify_1.default(this.data) +
                ';');
        }
    }
}
exports.MappingStore = MappingStore;
class SSTORE {
    constructor(location, data, variables) {
        this.name = 'SSTORE';
        this.wrapped = true;
        this.location = location;
        this.data = data;
        this.variables = variables;
        if (BigNumber.isInstance(this.location) && this.location.toString() in this.variables()) {
            this.variables()[this.location.toString()].types.push(() => this.data.type);
        }
        else if (BigNumber.isInstance(this.location) &&
            !(this.location.toString() in this.variables())) {
            this.variables()[this.location.toString()] = new jumpi_1.Variable(false, [
                () => this.data.type
            ]);
        }
    }
    toString() {
        let variableName = 'storage[' + stringify_1.default(this.location) + ']';
        if (BigNumber.isInstance(this.location) && this.location.toString() in this.variables()) {
            if (this.variables()[this.location.toString()].label) {
                variableName = this.variables()[this.location.toString()].label;
            }
            else {
                variableName =
                    'var' + (Object.keys(this.variables()).indexOf(this.location.toString()) + 1);
            }
        }
        if (this.data.name === 'ADD' &&
            this.data.right.name === 'SLOAD' &&
            stringify_1.default(this.data.right.location) === stringify_1.default(this.location)) {
            return variableName + ' += ' + stringify_1.default(this.data.left) + ';';
        }
        else if (this.data.name === 'SUB' &&
            this.data.left.name === 'SLOAD' &&
            stringify_1.default(this.data.left.location) === stringify_1.default(this.location)) {
            return variableName + ' -= ' + stringify_1.default(this.data.right) + ';';
        }
        else {
            return variableName + ' = ' + stringify_1.default(this.data) + ';';
        }
    }
}
exports.SSTORE = SSTORE;
exports.default = (opcode, state) => {
    const storeLocation = state.stack.pop();
    const storeData = state.stack.pop();
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
            state.mappings[mappingLocation].values.push(storeData);
            state.instructions.push(new MappingStore(() => state.mappings, mappingLocation, mappingParts, storeData, Object.keys(state.mappings).indexOf(mappingLocation.toString())));
        }
        else {
            state.instructions.push(new SSTORE(storeLocation, storeData, () => state.variables));
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
            state.instructions.push(new MappingStore(() => state.mappings, mappingLocation, mappingParts, storeData, Object.keys(state.mappings).indexOf(mappingLocation.toString()), storeLocation.right));
        }
        else {
            state.instructions.push(new SSTORE(storeLocation, storeData, () => state.variables));
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
            state.instructions.push(new MappingStore(() => state.mappings, mappingLocation, mappingParts, storeData, Object.keys(state.mappings).indexOf(mappingLocation.toString()), storeLocation.left));
        }
        else {
            state.instructions.push(new SSTORE(storeLocation, storeData, () => state.variables));
        }
    }
    else if (false &&
        BigNumber.isInstance(storeLocation) &&
        storeLocation.toString() in state.variables &&
        storeData.type &&
        !state.variables[storeLocation.toString()].types.includes(storeData.type)) {
        state.instructions.push(new SSTORE(storeLocation, storeData, () => state.variables));
        state.variables[storeLocation.toString()].types.push(storeData.type);
    }
    else {
        state.instructions.push(new SSTORE(storeLocation, storeData, () => state.variables));
    }
};
//# sourceMappingURL=sstore.js.map