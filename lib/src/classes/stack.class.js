"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Stack {
    constructor() {
        this.elements = [];
    }
    push(item) {
        if (this.elements.length >= 1024) {
            throw new Error('Stack too deep');
        }
        else {
            this.elements.unshift(item);
        }
    }
    pop() {
        if (this.elements.length === 0) {
            throw new Error('POP with empty stack');
        }
        else {
            return this.elements.shift();
        }
    }
    duplicate(position) {
        if (position < 0 || position > 15) {
            throw new Error('Unsupported position for duplication operation');
        }
        else if (!(position in this.elements)) {
            throw new Error("Invalid duplication operation, provided position wasn't found in stack");
        }
        else {
            this.push(this.elements[position]);
        }
    }
    swap(secondPosition) {
        if (secondPosition < 1 || secondPosition > 16) {
            throw new Error('Unsupported position for swap operation');
        }
        else if (!(secondPosition in this.elements)) {
            throw new Error("Invalid swap operation, provided position wasn't found in stack");
        }
        else {
            const firstValue = this.elements[0];
            const secondValue = this.elements[secondPosition];
            this.elements[0] = secondValue;
            this.elements[secondPosition] = firstValue;
        }
    }
    clone() {
        const stack = new Stack();
        stack.elements = [...this.elements];
        return stack;
    }
    reset() {
        this.elements = [];
    }
}
exports.default = Stack;
//# sourceMappingURL=stack.class.js.map