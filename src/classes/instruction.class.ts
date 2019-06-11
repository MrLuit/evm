import * as util from 'util';

export default class Instruction {
    name: string;
    pc: number;
    description?: string;
    debugLevel: number;
    halted: boolean;
    jump: boolean | object;

    constructor(name: string, pc: number) {
        this.name = name;
        this.pc = pc;
        this.debugLevel = 2;
        this.halted = false;
        this.jump = false;
    }

    halt(shouldHalt: boolean = true): void {
        this.halted = shouldHalt;
    }

    setLevel(debugLevel: number): void {
        this.debugLevel = debugLevel;
    }

    setDebug(): void {
        this.setLevel(0);
    }

    setDescription(description: string, ...args: string[]): void {
        this.description = util.format(description, ...args);
    }

    setJump(jump: any): void {
        this.jump = jump;
    }
}
