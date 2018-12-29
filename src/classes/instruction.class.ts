import * as util from 'util';

export default class Instruction {
    name: string;
    pc: number;
    description?: string;
    debugLevel: number;
    halted?: boolean;
    jump?: any;

    constructor(name: string, pc: number) {
        this.name = name;
        this.pc = pc;
        this.debugLevel = 2;
        this.halted = false;
    }

    halt(shouldHalt: boolean = true) {
        this.halted = shouldHalt;
        return this;
    }

    setLevel(debugLevel: number) {
        this.debugLevel = debugLevel;
        return this;
    }

    setDebug() {
        this.setLevel(0);
        return this;
    }

    setDescription(description: string, ...args: string[]) {
        this.description = util.format(description, ...args);
        return this;
    }

    setJump(jump: any) {
        this.jump = jump;
        return this;
    }
}
