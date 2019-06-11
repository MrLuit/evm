import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import Instruction from '../classes/instruction.class';
import * as BigNumber from '../../node_modules/big-integer';
import stringify from '../utils/stringify';

export class TopLevelFunction {
    readonly type: string;
    readonly payable: boolean;
    readonly visibility: string;
    readonly constant: boolean;
    readonly items: any;

    constructor(items: any) {
        this.type = 'Function';
        this.items = items;
        this.payable = true;
        this.visibility = 'public';
        this.constant = false;
        if (
            this.items.length > 0 &&
            this.items[0] instanceof REQUIRE &&
            this.items[0].condition.type === 'ISZERO' &&
            this.items[0].condition.item.type === 'CALLVALUE'
        ) {
            this.payable = false;
            this.items.shift();
        }
        if (this.items.length === 1 && this.items[0].type === 'RETURN') {
            this.constant = true;
        }
    }
}

export class REQUIRE {
    readonly type: string;
    readonly static: boolean;
    readonly condition: any;

    constructor(condition: any) {
        this.type = 'REQUIRE';
        this.static = false;
        this.condition = condition;
    }

    toString() {
        return 'require(' + stringify(this.condition) + ');';
    }
}

export class JUMPI {
    readonly type: string;
    readonly static: boolean;
    readonly condition: any;
    readonly location: any;
    readonly valid: boolean;
    readonly true?: any;
    readonly false?: any;
    readonly payable?: boolean;

    constructor(condition: any, location: any, ifTrue?: any, ifFalse?: any, skipped?: boolean) {
        this.type = 'JUMPI';
        this.static = false;
        this.condition = condition;
        this.location = location;
        if (skipped) {
            this.valid = true;
        } else if (ifTrue && ifFalse) {
            this.valid = true;
            this.true = ifTrue;
            this.false = ifFalse;
            if (
                this.true.length >= 1 &&
                this.true[0] instanceof REQUIRE &&
                this.true[0].condition.type === 'ISZERO' &&
                this.true[0].condition.item.type === 'CALLVALUE'
            ) {
                this.payable = false;
                this.true.shift();
            } else {
                this.payable = true;
            }
        } else {
            this.valid = false;
        }
    }

    toString() {
        if (this.valid && this.true && this.false) {
            return stringify(this.condition);
        } else if (this.valid) {
            return 'if' + stringify(this.condition) + ' goto(' + stringify(this.location) + ');';
        } else {
            return "revert(\"Bad jump destination\");";
        }
    }
}

export default (opcode: Opcode, state: EVM): Instruction => {
    const jumpLocation = state.stack.pop();
    const jumpCondition = state.stack.pop();
    const instruction = new Instruction(opcode.name, opcode.pc);
    const opcodes = state.getOpcodes();
    if (!BigNumber.isInstance(jumpLocation)) {
        instruction.halt();
        state.halted = true;
        state.instructions.push(new JUMPI(jumpCondition, jumpLocation));
    } else {
        const jumpLocationData = opcodes.find((o: any) => o.pc === jumpLocation.toJSNumber());
        if (!jumpLocationData || jumpLocationData.name !== 'JUMPDEST') {
            instruction.halt();
            state.halted = true;
            state.instructions.push(new JUMPI(jumpCondition, jumpLocation));
        } else if (BigNumber.isInstance(jumpCondition)) {
            const jumpIndex = opcodes.indexOf(jumpLocationData);
            if (
                jumpIndex >= 0 &&
                !jumpCondition.equals(0) &&
                !(opcode.pc + ':' + jumpLocation.toJSNumber() in state.jumps)
            ) {
                state.jumps[opcode.pc + ':' + jumpLocation.toJSNumber()] = true;
                state.pc = jumpIndex;
            }
        } else if (
            !(opcode.pc + ':' + jumpLocation.toJSNumber() in state.jumps) &&
            jumpCondition.type === 'SIG'
        ) {
            const jumpIndex = opcodes.indexOf(jumpLocationData);
            if (jumpIndex >= 0) {
                const functionClone: any = state.clone();
                functionClone.pc = jumpIndex;
                state.functions[jumpCondition.hash] = new TopLevelFunction(functionClone.parse());
            }
        } else if (!(opcode.pc + ':' + jumpLocation.toJSNumber() in state.jumps)) {
            const jumpIndex = opcodes.indexOf(jumpLocationData);
            state.jumps[opcode.pc + ':' + jumpLocation.toJSNumber()] = true;
            if (jumpIndex >= 0) {
                instruction.halt();
                state.halted = true;
                const trueClone: any = state.clone();
                trueClone.pc = jumpIndex;
                const trueCloneTree = trueClone.parse();
                const falseClone = state.clone();
                falseClone.pc = state.pc + 1;
                const falseCloneTree: any = falseClone.parse();
                if (
                    falseCloneTree.length === 1 &&
                    'type' in falseCloneTree[0] &&
                    falseCloneTree[0].type === 'REVERT' &&
                    falseCloneTree[0].items &&
                    falseCloneTree[0].items.length === 0
                ) {
                    state.instructions.push(new REQUIRE(jumpCondition));
                    state.instructions.push(...trueCloneTree);
                    /*} else if (
                    trueCloneTree.length === 1 &&
                    trueCloneTree[0] instanceof JUMPI &&
                    JSON.stringify(trueCloneTree[0].condition) === JSON.stringify(jumpCondition)
                ) {
                    // DEEP EQUAL
                    state.instructions.push(...trueCloneTree[0].items);*/
                } else {
                    state.instructions.push(
                        new JUMPI(jumpCondition, jumpLocation, trueCloneTree, falseCloneTree)
                    );
                }
            }
        } else {
            state.instructions.push(new JUMPI(jumpCondition, jumpLocation, null, null, true));
        }
    }
    return instruction;
};
