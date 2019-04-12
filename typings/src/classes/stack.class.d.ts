export default class Stack {
    elements: any[];
    constructor();
    push(item: any): void;
    pop(): any;
    duplicate(position: number): void;
    swap(secondPosition: number): void;
    clone(): Stack;
    reset(): void;
}
