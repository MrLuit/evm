import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import * as BigNumber from '../../node_modules/big-integer';
import * as functionHashes from '../../data/functionHashes.json';
import stringify from '../utils/stringify';

const updateCallDataLoad = (item: any, types: any) => {
    for (const i in item) {
        if (item.hasOwnProperty(i)) {
            if (
                typeof item[i] === 'object' &&
                item[i].name === 'CALLDATALOAD' &&
                BigNumber.isInstance(item[i].location)
            ) {
                const argNumber = item[i].location
                    .subtract(4)
                    .divide(32)
                    .toString();
                item[i].type = types[argNumber];
            }
            if (typeof item[i] === 'object') {
                updateCallDataLoad(item[i], types);
            }
        }
    }
};

export class TopLevelFunction {
    readonly name: string;
    readonly type?: string;
    readonly hash: any;
    readonly payable: boolean;
    readonly visibility: string;
    readonly constant: boolean;
    readonly items: any;

    constructor(items: any, hash: any) {
        this.name = 'Function';
        this.hash = hash;
        this.items = items;
        this.payable = true;
        this.visibility = 'public';
        this.constant = false;
        if (
            this.items.length > 0 &&
            this.items[0] instanceof REQUIRE &&
            this.items[0].condition.name === 'ISZERO' &&
            this.items[0].condition.item.name === 'CALLVALUE'
        ) {
            this.payable = false;
            this.items.shift();
        }
        if (this.items.length === 1 && this.items[0].name === 'RETURN') {
            this.constant = true;
        }
        if (this.hash in functionHashes) {
            const functionName = (functionHashes as any)[this.hash].split('(')[0];
            const argumentTypes = (functionHashes as any)[this.hash]
                .replace(functionName, '')
                .substr(1)
                .slice(0, -1)
                .split(',');
            if (
                argumentTypes.length > 1 ||
                (argumentTypes.length === 1 && argumentTypes[0] !== '')
            ) {
                this.items.forEach((item: any) => updateCallDataLoad(item, argumentTypes));
            }
        }
    }
}

export class REQUIRE {
    readonly name: string;
    readonly type?: string;
    readonly wrapped: boolean;
    readonly condition: any;

    constructor(condition: any) {
        this.name = 'REQUIRE';
        this.wrapped = false;
        this.condition = condition;
    }

    toString() {
        return 'require(' + stringify(this.condition) + ');';
    }
}

export class JUMPI {
    readonly name: string;
    readonly type?: string;
    readonly wrapped: boolean;
    readonly condition: any;
    readonly location: any;
    readonly valid: boolean;
    readonly true?: any;
    readonly false?: any;
    readonly payable?: boolean;

    constructor(condition: any, location: any, ifTrue?: any, ifFalse?: any, skipped?: boolean) {
        this.name = 'JUMPI';
        this.wrapped = false;
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
                this.true[0].condition.name === 'ISZERO' &&
                this.true[0].condition.item.name === 'CALLVALUE'
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

export default (opcode: Opcode, state: EVM): void => {
    const jumpLocation = state.stack.pop();
    const jumpCondition = state.stack.pop();
    const opcodes = state.getOpcodes();
    if (!BigNumber.isInstance(jumpLocation)) {
        state.halted = true;
        state.instructions.push(new JUMPI(jumpCondition, jumpLocation));
    } else {
        const jumpLocationData = opcodes.find((o: any) => o.pc === jumpLocation.toJSNumber());
        if (!jumpLocationData || jumpLocationData.name !== 'JUMPDEST') {
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
            jumpCondition.name === 'SIG'
        ) {
            const jumpIndex = opcodes.indexOf(jumpLocationData);
            if (jumpIndex >= 0) {
                const functionClone: any = state.clone();
                functionClone.pc = jumpIndex;
                state.functions[jumpCondition.hash] = new TopLevelFunction(
                    functionClone.parse(),
                    jumpCondition.hash
                );
            }
        } else if (
            !(opcode.pc + ':' + jumpLocation.toJSNumber() in state.jumps) &&
            jumpCondition.name === 'LT' &&
            jumpCondition.left.name === 'CALLDATASIZE' &&
            BigNumber.isInstance(jumpCondition.right) &&
            jumpCondition.right.equals(4)
        ) {
            const jumpIndex = opcodes.indexOf(jumpLocationData);
            if (jumpIndex >= 0) {
                state.halted = true;
                const trueClone: any = state.clone();
                trueClone.pc = jumpIndex;
                const trueCloneTree = trueClone.parse();
                const falseClone = state.clone();
                falseClone.pc = state.pc + 1;
                const falseCloneTree: any = falseClone.parse();
                if (
                    trueCloneTree.length > 0 &&
                    trueCloneTree.length === falseCloneTree.length &&
                    trueCloneTree[0].name !== 'REVERT' &&
                    trueCloneTree.map((item: any) => stringify(item)).join('') ===
                        falseCloneTree.map((item: any) => stringify(item)).join('')
                ) {
                    state.functions[''] = new TopLevelFunction(trueCloneTree, '');
                } else if (trueCloneTree.length > 0 && trueCloneTree[0].name !== 'REVERT') {
                    state.instructions.push(
                        new JUMPI(jumpCondition, jumpLocation, trueCloneTree, falseCloneTree)
                    );
                }
            }
        } else if (!(opcode.pc + ':' + jumpLocation.toJSNumber() in state.jumps)) {
            const jumpIndex = opcodes.indexOf(jumpLocationData);
            state.jumps[opcode.pc + ':' + jumpLocation.toJSNumber()] = true;
            if (jumpIndex >= 0) {
                state.halted = true;
                const trueClone: any = state.clone();
                trueClone.pc = jumpIndex;
                const trueCloneTree = trueClone.parse();
                const falseClone = state.clone();
                falseClone.pc = state.pc + 1;
                const falseCloneTree: any = falseClone.parse();
                if (
                    (falseCloneTree.length === 1 &&
                        'name' in falseCloneTree[0] &&
                        (falseCloneTree[0].name === 'REVERT' &&
                            falseCloneTree[0].items &&
                            falseCloneTree[0].items.length === 0)) ||
                    falseCloneTree[0].name === 'INVALID'
                ) {
                    state.instructions.push(new REQUIRE(jumpCondition));
                    state.instructions.push(...trueCloneTree);
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
};
