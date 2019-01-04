export default class OpcodeTestFactory {
    name: string;
    pc: number;
    stack: string[];
    pushData?: Buffer;

    constructor(name: string = 'TEST') {
        this.name = name;
        this.pc = 0;
        this.stack = [];
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
        return this.stack.reverse();
    }

    setName(name: string) {
        this.name = name;
        return this;
    }

    setStack(stack: string[]) {
        this.stack = stack.reverse();
        return this;
    }

    setPushData(data: string) {
        this.pushData = Buffer.from(data.replace('0x', ''), 'hex');
        return this;
    }

    run(opcodeFunction: any) {
        opcodeFunction(this.getOpcode(), this.getState());
        return this;
    }
}
