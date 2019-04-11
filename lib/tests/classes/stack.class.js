"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const stack_class_1 = require("../../src/classes/stack.class");
describe('stack.class.ts', () => {
    it('should create an instance', () => {
        const stack = new stack_class_1.default();
        chai_1.expect(stack).to.be.an.instanceof(stack_class_1.default);
    });
    it('should push successfully', () => {
        const stack = new stack_class_1.default();
        stack.push('1');
        chai_1.expect(stack.elements).to.deep.equal(['1']);
        stack.push('0');
        chai_1.expect(stack.elements).to.deep.equal(['0', '1']);
    });
    it('should pop successfully', () => {
        const stack = new stack_class_1.default();
        stack.push(1);
        stack.push(2);
        chai_1.expect(stack.elements).to.deep.equal([2, 1]);
        chai_1.expect(stack.pop()).to.deep.equal(2);
        chai_1.expect(stack.elements).to.deep.equal([1]);
        chai_1.expect(stack.pop()).to.deep.equal(1);
        chai_1.expect(stack.elements).to.deep.equal([]);
        chai_1.expect(() => stack.pop()).to.throw(Error, 'POP with empty stack');
    });
    it('should duplicate successfully', () => {
        const stack = new stack_class_1.default();
        stack.push('x');
        stack.push('y');
        stack.push('z');
        chai_1.expect(stack.elements).to.deep.equal(['z', 'y', 'x']);
        stack.duplicate(0);
        chai_1.expect(stack.elements).to.deep.equal(['z', 'z', 'y', 'x']);
        stack.duplicate(3);
        chai_1.expect(stack.elements).to.deep.equal(['x', 'z', 'z', 'y', 'x']);
        chai_1.expect(() => stack.duplicate(-1)).to.throw(Error, 'Unsupported position for duplication operation');
        chai_1.expect(() => stack.duplicate(16)).to.throw(Error, 'Unsupported position for duplication operation');
        chai_1.expect(() => stack.duplicate(5)).to.throw(Error, "Invalid duplication operation, provided position wasn't found in stack");
    });
    it('should swap successfully', () => {
        const stack = new stack_class_1.default();
        stack.push('a');
        stack.push('b');
        stack.push('c');
        chai_1.expect(stack.elements).to.deep.equal(['c', 'b', 'a']);
        stack.swap(1);
        chai_1.expect(stack.elements).to.deep.equal(['b', 'c', 'a']);
        stack.swap(2);
        chai_1.expect(stack.elements).to.deep.equal(['a', 'c', 'b']);
        chai_1.expect(() => stack.swap(0)).to.throw(Error, 'Unsupported position for swap operation');
        chai_1.expect(() => stack.swap(17)).to.throw(Error, 'Unsupported position for swap operation');
        chai_1.expect(() => stack.swap(3)).to.throw(Error, "Invalid swap operation, provided position wasn't found in stack");
    });
    it('should clone successfully', () => {
        const stack1 = new stack_class_1.default();
        stack1.push(3);
        chai_1.expect(stack1.elements).to.deep.equal([3]);
        const stack2 = stack1.clone();
        chai_1.expect(stack2.elements).to.deep.equal([3]);
        stack1.pop();
        chai_1.expect(stack1.elements).to.deep.equal([]);
        chai_1.expect(stack2.elements).to.deep.equal([3]);
    });
    it('should reset successfully', () => {
        const stack = new stack_class_1.default();
        stack.push(100);
        chai_1.expect(stack.elements).to.deep.equal([100]);
        stack.reset();
        chai_1.expect(stack.elements).to.deep.equal([]);
    });
});
//# sourceMappingURL=stack.class.js.map