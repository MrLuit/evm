import Stack from '../../src/classes/stack.class';

export default class OpcodeTestFactory {
    name: string;
    pc: number;
    stack: Stack;
    pushData?: Buffer;

    constructor(name: string = 'TEST') {
        this.name = name;
        this.pc = 0;
        this.stack = new Stack();
    }

    getOpcode() {
        return {
            name: this.name,
            pc: this.pc,
            pushData: this.pushData
        };
    }

    getState() {
        return {
            stack: this.stack
        };
    }

    getStack() {
        return this.stack.elements;
    }

    setName(name: string) {
        this.name = name;
    }

    setStack(stack: string[]) {
        this.stack.elements = stack;
    }

    setPushData(data: string) {
        this.pushData = Buffer.from(data.replace('0x', ''), 'hex');
    }

    run(opcodeFunction: any) {
        return opcodeFunction(this.getOpcode(), this.getState());
    }
}
