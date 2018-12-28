const findOpcode = require('./utils/opcodes.js');
const parseFunction = require("./utils/functions");

function stringifyInstructions(depthInstructions,debug = false,indentation = 0) {
    let instructionLines = "";
    depthInstructions.forEach(instruction => {
        if(instruction.jump && instruction.jump.false.filter(i => !i.debug).length == 1 && instruction.jump.false.filter(i => !i.debug)[0].text == "revert();" && !instruction.jump.condition.includes("msg.sig")) {
            instructionLines += " ".repeat(indentation) + "require" + instruction.jump.condition + ";\n";
            instructionLines += stringifyInstructions(instruction.jump.true,debug,indentation);
        } else if(instruction.jump && instruction.jump.false.filter(i => !i.debug).length == 1 && instruction.jump.false.filter(i => !i.debug)[0].jump) {
            instructionLines += " ".repeat(indentation) + "if" + instruction.jump.condition + " {\n";
            instructionLines += stringifyInstructions(instruction.jump.true,debug,indentation+4);
            instructionLines += " ".repeat(indentation) + "} else ";
            const elseOrElseIf = stringifyInstructions(instruction.jump.false,debug,indentation);
            if(elseOrElseIf.trim().startsWith("if")) {
                instructionLines += elseOrElseIf.trim() + "\n";
            } else {
                instructionLines += "{\n" + elseOrElseIf.split("\n").filter(l => l).map(l => " ".repeat(4) + l).join("\n");
                instructionLines += "\n" + " ".repeat(indentation) +"}\n";
            }
        } else if(instruction.jump) {
            instructionLines += " ".repeat(indentation) + "if" + instruction.jump.condition + " {\n";
            instructionLines += stringifyInstructions(instruction.jump.true,debug,indentation+4);
            instructionLines += " ".repeat(indentation) + "} else {\n";
            instructionLines += stringifyInstructions(instruction.jump.false,debug,indentation+4);
            instructionLines += " ".repeat(indentation) + "}\n";
        } else if(debug || !instruction.debug) {
            instructionLines += " ".repeat(indentation) + instruction.text + "\n";
        }
    });
    return instructionLines;
}

function parseFunctions(stringifiedInstructions) {
    return stringifiedInstructions.split("\n").map(line => {
        if(!line.startsWith(" ") && line.includes("msg.sig")) {
            let functionHash = line.split(" == ").find(piece => !piece.includes("msg.sig"));
            if(functionHash.includes("(")) {
                functionHash = functionHash.split("(")[1];
            } else if(functionHash.includes(")")) {
                functionHash = functionHash.split(")")[0];
            }
            return "}\n\nfunction " + parseFunction(functionHash) + " {";
        } else {
            return line;
        }
    }).join("\n");
}

const EVM = class EVM {
    constructor(code,pc = 0,stack = [],memory = {},jumps = {}) {
        this.pc = pc;
        this.pseudoInstructions = [];
        this.stack = stack;
        this.memory = memory;
        this.storage = {};
        this.jumps = jumps;
        if(code instanceof Buffer) {
            this.code = code;
        } else {
            this.code = Buffer.from(code.replace("0x",""),"hex");
        }
    }

    getByteCode() {
        return '0x' + this.code.toString('hex');
    }

    getOpcodes() {
        const ops = [];
        for (var index = 0; index < this.code.length; index++) {
            const currentOp = findOpcode(this.code[index], true);
            currentOp.pc = index;
            ops.push(currentOp);
            if (currentOp.name.startsWith('PUSH')) {
                const pushDataLength = this.code[index] - 0x5f;
                const pushData = this.code.slice(index + 1, index + pushDataLength + 1);
                currentOp.pushData = pushData;
                index += pushDataLength;
            }
        }
        return ops;
    }

    clean() {
        this.pc = 0;
        this.pseudoCode = "";
        this.stack = [];
        this.memory = {};
    }

    run() {
        const opCodes = this.getOpcodes();
        const run = this.run;
        for(this.pc; this.pc < opCodes.length; this.pc++) {
            //console.log(this.pc);
            const opCode = opCodes[this.pc];
            const pseudoInstruction = {};
            pseudoInstruction.pc = opCode.pc;
            pseudoInstruction.debug = false;
            //console.log(opCode.pc + ' ' + opCode.name + ' ' + JSON.stringify(this.stack));
            //console.log(this.jumps);
            //console.log(opCode.pc);
            switch(opCode.name) {
                case "STOP": {
                    pseudoInstruction.text = "return;";
                    pseudoInstruction.halt = true;
                } break;
                case "ADD": {
                    const stackItem1 = this.stack.pop();
                    const stackItem2 = this.stack.pop();
                    if(stackItem1 == '00') {
                        this.stack.push(stackItem2);
                        pseudoInstruction.text = "stack.push(" + stackItem2 + ");";
                    } else if(stackItem2 == '00') {
                        this.stack.push(stackItem1);
                        pseudoInstruction.text = "stack.push(" + stackItem1 + ");";
                    } else if(!isNaN(parseInt(stackItem1,16)) && !isNaN(parseInt(stackItem2,16))) {
                        this.stack.push((parseInt(stackItem1,16)+parseInt(stackItem2,16)).toString(16));
                        pseudoInstruction.text = "stack.push(" + (parseInt(stackItem1,16)+parseInt(stackItem2,16)).toString(16) + ");";
                    } else {
                        this.stack.push("(" + stackItem1 + " + " + stackItem2 + ")");
                        pseudoInstruction.text = "stack.push(" + stackItem1 + " + " + stackItem2 + ");";
                    }
                    pseudoInstruction.debug = true;
                } break;
                case "MUL": {
                    const stackItem1 = this.stack.pop();
                    const stackItem2 = this.stack.pop();
                    this.stack.push("(" + stackItem1 + " * " + stackItem2 + ")");
                    pseudoInstruction.text = "stack.push(" + stackItem1 + " * " + stackItem2 + ");";
                    pseudoInstruction.debug = true;
                } break;
                case "SUB": {
                    const stackItem1 = this.stack.pop();
                    const stackItem2 = this.stack.pop();
                    if(!isNaN(parseInt(stackItem1,16)) && !isNaN(parseInt(stackItem2,16))) {
                        this.stack.push((parseInt(stackItem1,16)-parseInt(stackItem2,16)).toString(16));
                        pseudoInstruction.text = "stack.push(" + (parseInt(stackItem1,16)-parseInt(stackItem2,16)).toString(16) + ");";
                    } else {
                        this.stack.push("(" + stackItem1 + " - " + stackItem2 + ")");
                        pseudoInstruction.text = "stack.push(" + stackItem1 + " - " + stackItem2 + ");";
                    }
                    pseudoInstruction.debug = true;
                } break;
                case "DIV": { /* if(stackItem2 == 0) stack.push(0); */
                    const stackItem1 = this.stack.pop();
                    const stackItem2 = this.stack.pop();
                    if(stackItem1 == "msg.data" && (stackItem2 == "0100000000000000000000000000000000000000000000000000000000" || stackItem2 == "100000000000000000000000000000000000000000000000000000000")) {
                        /* msg.data contains 32 bytes (33 including 0x), stackItem2 contains 29 bytes; only the first 4 bytes (function signature) are left */
                        this.stack.push("msg.sig");
                        pseudoInstruction.text = "stack.push(msg.sig);";
                    } else {
                        this.stack.push("(" + stackItem1 + " / " + stackItem2 + ")");
                        pseudoInstruction.text = "stack.push(" + stackItem1 + " / " + stackItem2 + ");";
                    }
                    pseudoInstruction.debug = true;
                } break;
                case "EXP": {
                    const stackItem1 = this.stack.pop();
                    const stackItem2 = this.stack.pop();
                    if(!isNaN(parseInt(stackItem1,16)) && !isNaN(parseInt(stackItem2,16))) {
                        this.stack.push((parseInt(stackItem1,16)**parseInt(stackItem2,16)).toString(16));
                        pseudoInstruction.text = "stack.push(" + (parseInt(stackItem1,16)**parseInt(stackItem2,16)).toString(16) + ");";
                    } else {
                        this.stack.push("(" + stackItem1 + " ** " + stackItem2 + ")");
                        pseudoInstruction.text = "stack.push(" + stackItem1 + " ** " + stackItem2 + ");";
                    }
                    pseudoInstruction.debug = true;
                } break;
                case "LT": {
                    const stackItem1 = this.stack.pop();
                    const stackItem2 = this.stack.pop();
                    this.stack.push("(" + stackItem1 + " < " + stackItem2 + ")");
                    pseudoInstruction.text = "stack.push(" + stackItem1 + " < " + stackItem2 + ");";
                    pseudoInstruction.debug = true;
                } break;
                case "GT": {
                    const stackItem1 = this.stack.pop();
                    const stackItem2 = this.stack.pop();
                    this.stack.push("(" + stackItem1 + " > " + stackItem2 + ")");
                    pseudoInstruction.text = "stack.push(" + stackItem1 + " > " + stackItem2 + ");";
                    pseudoInstruction.debug = true;
                } break;
                case "EQ": {
                    const stackItem1 = this.stack.pop();
                    const stackItem2 = this.stack.pop();
                    this.stack.push("(" + stackItem1 + " == " + stackItem2 + ")");
                    pseudoInstruction.text = "stack.push(" + stackItem1 + " == " + stackItem2 + ");";
                    pseudoInstruction.debug = true;
                } break;
                case "ISZERO": {
                    const stackItem = this.stack.pop();
                    if(stackItem.startsWith("(") && stackItem.endsWith(" == 0)")) {
                        /* ((x == 0) == 0) -> x */
                        this.stack.push("(" + stackItem.replace("(","").replace(" == 0)","") + ")");
                        pseudoInstruction.text = "stack.push(" + stackItem.replace("(","").replace(" == 0)","") + ");";
                    } else {
                        this.stack.push("(" + stackItem + " == 0" + ")");
                        pseudoInstruction.text = "stack.push(" + stackItem + " == 0);";
                    }
                    pseudoInstruction.debug = true;
                } break;
                case "AND": {
                    const stackItem1 = this.stack.pop();
                    const stackItem2 = this.stack.pop();
                    if(/^f*$/.test(stackItem1) || stackItem1 == "10000000000000000000000000000000000000000") {
                        // Since type / length matching is not really useful for our use case, we won't include it
                        this.stack.push(stackItem2);
                        pseudoInstruction.text = "stack.push(" + stackItem2 + ");";
                    } else if(/^f*$/.test(stackItem2) || stackItem2 == "10000000000000000000000000000000000000000") {
                        // Since type / length matching is not really useful for our use case, we won't include it
                        this.stack.push(stackItem1);
                        pseudoInstruction.text = "stack.push(" + stackItem1 + ");";
                    } else {
                        this.stack.push("(" + stackItem1 + " && " + stackItem2 + ")");
                        pseudoInstruction.text = "stack.push(" + stackItem1 + " && " + stackItem2 + ");";
                    }
                    pseudoInstruction.debug = true;
                } break;
                case "OR": {
                    const stackItem1 = this.stack.pop();
                    const stackItem2 = this.stack.pop();
                    this.stack.push("(" + stackItem1 + " || " + stackItem2 + ")");
                    pseudoInstruction.text = "stack.push(" + stackItem1 + " || " + stackItem2 + ");";
                    pseudoInstruction.debug = true;
                } break;
                case "NOT": {
                    const stackItem = this.stack.pop();
                    this.stack.push("!(" + stackItem + ")");
                    pseudoInstruction.text = "stack.push(!(" + stackItem + "));";
                    pseudoInstruction.debug = true;
                } break;
                case "SHA3": {
                    const startLocation = this.stack.pop();
                    const memoryLength = this.stack.pop();
                    if(startLocation == '00') {
                        this.stack.push("sha3(memory[0x00:0x" + memoryLength + "]))");
                        pseudoInstruction.text = "stack.push(sha3(memory[0x00:0x" + memoryLength + "]));";
                    } else {
                        this.stack.push("sha3(memory[0x" + startLocation + ":(0x" + startLocation + "+0x" + memoryLength + ")])");
                        pseudoInstruction.text = "stack.push(sha3(memory[0x" + startLocation + ":(0x" + startLocation + "+0x" + memoryLength + ")]));";
                    }
                    pseudoInstruction.debug = true;
                } break;
                case "ADDRESS": {
                    this.stack.push("this");
                    pseudoInstruction.text = "stack.push(this);";
                    pseudoInstruction.debug = true;
                } break;
                case "BALANCE": {
                    const address = this.stack.pop();
                    this.stack.push(address + ".balance");
                    pseudoInstruction.text = "stack.push(" + address + ".balance);";
                    pseudoInstruction.debug = true;
                } break;
                case "ORIGIN": {
                    this.stack.push("tx.origin");
                    pseudoInstruction.text = "stack.push(tx.origin);";
                    pseudoInstruction.debug = true;
                } break;
                case "CALLER": {
                    this.stack.push("msg.sender");
                    pseudoInstruction.text = "stack.push(msg.sender);";
                    pseudoInstruction.debug = true;
                } break;
                case "CALLVALUE": {
                    this.stack.push("msg.value");
                    pseudoInstruction.text = "stack.push(msg.value);";
                    pseudoInstruction.debug = true;
                } break;
                case "CALLDATALOAD": {
                    const startLocation = this.stack.pop();
                    if(startLocation == '00') {
                        this.stack.push("msg.data");
                        pseudoInstruction.text = "stack.push(msg.data);";
                    } else {
                        this.stack.push("msg.data[0x" + startLocation + "]");
                        pseudoInstruction.text = "stack.push(msg.data[0x" + startLocation + "]);";
                    }
                    pseudoInstruction.debug = true;
                } break;
                case "CALLDATASIZE": {
                    this.stack.push("msg.data.length");
                    pseudoInstruction.text = "stack.push(msg.data.length);";
                    pseudoInstruction.debug = true;
                } break;
                case "CALLDATACOPY": {
                    const memoryLocation = this.stack.pop();
                    const startLocation = this.stack.pop();
                    const copyLength = this.stack.pop();
                    this.memory[memoryLocation] = "msg.data.substring(" + startLocation + ",(" + startLocation + "+" + copyLength + ")";
                    pseudoInstruction.text = "memory[" + memoryLocation + "] = msg.data.substring(" + startLocation + ",(" + startLocation + "+" + copyLength + "));";
                } break;
                case "CODECOPY": {
                    const memoryLocation = this.stack.pop();
                    const startLocation = this.stack.pop();
                    const copyLength = this.stack.pop();
                    this.memory[memoryLocation] = "this.code.substring(" + startLocation + ",(" + startLocation + "+" + copyLength + ")";
                    pseudoInstruction.text = "memory[" + memoryLocation + "] = this.code.substring(" + startLocation + ",(" + startLocation + "+" + copyLength + "));";
                } break;
                case "GASPRICE": {
                    this.stack.push("tx.gasprice");
                    pseudoInstruction.text = "stack.push(tx.gasprice);";
                    pseudoInstruction.debug = true;
                } break;
                case "EXTCODESIZE": {
                    const address = this.stack.pop();
                    this.stack.push("extcodesize(" + address + ");");
                    pseudoInstruction.text = "stack.push(extcodesize(" + address + "));";
                    pseudoInstruction.debug = true;
                } break;
                case "RETURNDATASIZE": {
                    this.stack.push("output.length");
                    pseudoInstruction.text = "stack.push(output.length);";
                    pseudoInstruction.debug = true;
                } break;
                case "RETURNDATACOPY": {
                    const memoryPosition = this.stack.pop();
                    const returnDataPosition = this.stack.pop();
                    const returnDataSize = this.stack.pop();
                    pseudoInstruction.text = "memory[" + memoryPosition + "] = output.substring(" + returnDataPosition + ",(" + returnDataPosition + "+" + returnDataSize + "))";
                } break;
                case "BLOCKHASH": {
                    const blockNumber = this.stack.pop();
                    this.stack.push("block.blockhash(" + blockNumber + ")");
                    pseudoInstruction.text = "stack.push(block.blockhash(" + blockNumber + "));";
                    pseudoInstruction.debug = true;
                } break;
                case "COINBASE": {
                    this.stack.push("block.coinbase");
                    pseudoInstruction.text = "stack.push(block.coinbase);";
                    pseudoInstruction.debug = true;
                } break;
                case "TIMESTAMP": {
                    this.stack.push("block.timestamp");
                    pseudoInstruction.text = "stack.push(block.timestamp);";
                    pseudoInstruction.debug = true;
                } break;
                case "NUMBER": {
                    this.stack.push("block.number");
                    pseudoInstruction.text = "stack.push(block.number);";
                    pseudoInstruction.debug = true;
                } break;
                case "DIFFICULTY": {
                    this.stack.push("block.difficulty");
                    pseudoInstruction.text = "stack.push(block.difficulty);";
                    pseudoInstruction.debug = true;
                } break;
                case "GASLIMIT": {
                    this.stack.push("block.gaslimit");
                    pseudoInstruction.text = "stack.push(block.gaslimit);";
                    pseudoInstruction.debug = true;
                } break;
                case "POP": {
                    this.stack.pop();
                    pseudoInstruction.text = "stack.pop();";
                    pseudoInstruction.debug = true;
                } break;
                case "MLOAD": { /* this.memory[memoryLocation] */
                    const memoryLocation = this.stack.pop();
                    if(memoryLocation in this.memory) {
                        this.stack.push(this.memory[memoryLocation]);
                        pseudoInstruction.text = "stack.push(" + this.memory[memoryLocation] + ");";
                    } else {
                        this.stack.push("memory[" + memoryLocation + "]");
                        pseudoInstruction.text = "stack.push(memory[" + memoryLocation + "]);";
                    }
                    pseudoInstruction.debug = true;
                } break;
                case "MSTORE": {
                    const storeLocation = this.stack.pop();
                    const storeData = this.stack.pop();
                    this.memory[storeLocation] = storeData;
                    pseudoInstruction.text = "memory[" + (!isNaN(parseInt(storeLocation,16)) ? '0x' + storeLocation : storeLocation) + "] = " + (!isNaN(parseInt(storeData,16)) ? '0x' + storeData : storeData) + ";";
                } break;
                case "MSTORE8": {
                    const storeLocation = this.stack.pop();
                    const storeData = this.stack.pop();
                    this.memory[storeLocation] = storeData;
                    pseudoInstruction.text = "memory[" + (!isNaN(parseInt(storeLocation,16)) ? '0x' + storeLocation : storeLocation) + "] = " + (!isNaN(parseInt(storeData,16)) ? '0x' + storeData : storeData) + ";";
                } break;
                case "SLOAD": {
                    const storeLocation = this.stack.pop();
                    this.stack.push("storage[" + (!isNaN(parseInt(storeLocation,16)) ? '0x' + storeLocation : storeLocation) + "]");
                    pseudoInstruction.text = "stack.push(storage[" + (!isNaN(parseInt(storeLocation,16)) ? '0x' + storeLocation : storeLocation) + "]);";
                    pseudoInstruction.debug = true;
                } break;
                case "SSTORE": {
                    const storeLocation = this.stack.pop();
                    const storeData = this.stack.pop();
                    this.storage[storeLocation] = storeData;
                    pseudoInstruction.text = "storage[" + (!isNaN(parseInt(storeLocation,16)) ? '0x' + storeLocation : storeLocation) + "] = " + (!isNaN(parseInt(storeData,16)) ? '0x' + storeData : storeData) + ";";
                } break;
                case "JUMP": {
                    const jumpLocation = this.stack.pop();
                    pseudoInstruction.text = "goto(" + jumpLocation/*parseInt(jumpLocation,16)*/ + ");";
                    /*pseudoInstruction.jump = {
                        condition: false,
                        location: parseInt(jumpLocation,16)
                    };*/
                    const jumpIndex = opCodes.indexOf(opCodes.find(o => o.pc == parseInt(jumpLocation,16)));
                    if((this.pc + ':' + parseInt(jumpLocation,16)) in this.jumps) {
                        
                    } else {
                        this.jumps[this.pc + ':' + parseInt(jumpLocation,16)] = true;
                        if(jumpIndex >= 0) {
                            //console.log('jump to ' + jumpIndex + ' from ' + this.pc);
                            //console.log("\nJUMP " + parseInt(jumpLocation,16) + "\n");
                            this.pc = jumpIndex;
                        }
                        pseudoInstruction.debug = true;
                    }
                    
                } break;
                case "JUMPI": {
                    const jumpLocation = this.stack.pop();
                    const jumpCondition = this.stack.pop();
                    pseudoInstruction.text = "if" + jumpCondition + " goto(" + parseInt(jumpLocation,16) + ");";
                    const jumpIndex = opCodes.indexOf(opCodes.find(o => o.pc == parseInt(jumpLocation,16)));
                    //console.log('halt jumpi to ' + jumpIndex + ' (' + parseInt(jumpLocation,16) + ')');
                    //console.log("\nJUMPI " + jumpCondition + ' ' + parseInt(jumpLocation,16) + ' (' + jumpIndex + ")\n");
                    if((this.pc + ':' + parseInt(jumpLocation,16)) in this.jumps) {
                        //process.abort();
                    } else {
                        this.jumps[this.pc + ':' + parseInt(jumpLocation,16)] = true;
                    
                    pseudoInstruction.jump = {
                        condition: jumpCondition,
                        location: parseInt(jumpLocation,16),
                        'true': (new EVM(this.code,jumpIndex,JSON.parse(JSON.stringify(this.stack)),JSON.parse(JSON.stringify(this.memory)),JSON.parse(JSON.stringify(this.jumps)))).run(),
                        'false': (new EVM(this.code,parseInt((this.pc+1).toString()),JSON.parse(JSON.stringify(this.stack)),JSON.parse(JSON.stringify(this.memory)),JSON.parse(JSON.stringify(this.jumps)))).run()
                    };
                }
                    pseudoInstruction.halt = true;
                } break;
                case "PC": {
                    this.stack.push("pc");
                    pseudoInstruction.text = "stack.push(pc);";
                    pseudoInstruction.debug = true;
                } break;
                case "MSIZE": {
                    this.stack.push("memory.length");
                    pseudoInstruction.text = "stack.push(memory.length);";
                    pseudoInstruction.debug = true;
                } break;
                case "GAS": {
                    this.stack.push("gasleft()");
                    pseudoInstruction.text = "stack.push(gasleft());";
                    pseudoInstruction.debug = true;
                } break;
                case "JUMPDEST": {
                    pseudoInstruction.text = "JUMPDEST";
                    pseudoInstruction.debug = true;
                } break;
                case "PUSH1": {
                    this.stack.push(opCode.pushData.toString('hex'));
                    pseudoInstruction.text = "stack.push(" + opCode.pushData.toString('hex') + ");";
                    pseudoInstruction.debug = true;
                } break;
                case "PUSH2": {
                    this.stack.push(opCode.pushData.toString('hex'));
                    pseudoInstruction.text = "stack.push(" + opCode.pushData.toString('hex') + ");";
                    pseudoInstruction.debug = true;
                } break;
                case "PUSH3": {
                    this.stack.push(opCode.pushData.toString('hex'));
                    pseudoInstruction.text = "stack.push(" + opCode.pushData.toString('hex') + ");";
                    pseudoInstruction.debug = true;
                } break;
                case "PUSH4": {
                    this.stack.push(opCode.pushData.toString('hex'));
                    pseudoInstruction.text = "stack.push(" + opCode.pushData.toString('hex') + ");";
                    pseudoInstruction.debug = true;
                } break;
                case "PUSH5": {
                    this.stack.push(opCode.pushData.toString('hex'));
                    pseudoInstruction.text = "stack.push(" + opCode.pushData.toString('hex') + ");";
                    pseudoInstruction.debug = true;
                } break;
                case "PUSH6": {
                    this.stack.push(opCode.pushData.toString('hex'));
                    pseudoInstruction.text = "stack.push(" + opCode.pushData.toString('hex') + ");";
                    pseudoInstruction.debug = true;
                } break;
                case "PUSH7": {
                    this.stack.push(opCode.pushData.toString('hex'));
                    pseudoInstruction.text = "stack.push(" + opCode.pushData.toString('hex') + ");";
                    pseudoInstruction.debug = true;
                } break;
                case "PUSH8": {
                    this.stack.push(opCode.pushData.toString('hex'));
                    pseudoInstruction.text = "stack.push(" + opCode.pushData.toString('hex') + ");";
                    pseudoInstruction.debug = true;
                } break;
                case "PUSH9": {
                    this.stack.push(opCode.pushData.toString('hex'));
                    pseudoInstruction.text = "stack.push(" + opCode.pushData.toString('hex') + ");";
                    pseudoInstruction.debug = true;
                } break;
                case "PUSH10": {
                    this.stack.push(opCode.pushData.toString('hex'));
                    pseudoInstruction.text = "stack.push(" + opCode.pushData.toString('hex') + ");";
                    pseudoInstruction.debug = true;
                } break;
                case "PUSH11": {
                    this.stack.push(opCode.pushData.toString('hex'));
                    pseudoInstruction.text = "stack.push(" + opCode.pushData.toString('hex') + ");";
                    pseudoInstruction.debug = true;
                } break;
                case "PUSH12": {
                    this.stack.push(opCode.pushData.toString('hex'));
                    pseudoInstruction.text = "stack.push(" + opCode.pushData.toString('hex') + ");";
                    pseudoInstruction.debug = true;
                } break;
                case "PUSH13": {
                    this.stack.push(opCode.pushData.toString('hex'));
                    pseudoInstruction.text = "stack.push(" + opCode.pushData.toString('hex') + ");";
                    pseudoInstruction.debug = true;
                } break;
                case "PUSH14": {
                    this.stack.push(opCode.pushData.toString('hex'));
                    pseudoInstruction.text = "stack.push(" + opCode.pushData.toString('hex') + ");";
                    pseudoInstruction.debug = true;
                } break;
                case "PUSH15": {
                    this.stack.push(opCode.pushData.toString('hex'));
                    pseudoInstruction.text = "stack.push(" + opCode.pushData.toString('hex') + ");";
                    pseudoInstruction.debug = true;
                } break;
                case "PUSH16": {
                    this.stack.push(opCode.pushData.toString('hex'));
                    pseudoInstruction.text = "stack.push(" + opCode.pushData.toString('hex') + ");";
                    pseudoInstruction.debug = true;
                } break;
                case "PUSH17": {
                    this.stack.push(opCode.pushData.toString('hex'));
                    pseudoInstruction.text = "stack.push(" + opCode.pushData.toString('hex') + ");";
                    pseudoInstruction.debug = true;
                } break;
                case "PUSH18": {
                    this.stack.push(opCode.pushData.toString('hex'));
                    pseudoInstruction.text = "stack.push(" + opCode.pushData.toString('hex') + ");";
                    pseudoInstruction.debug = true;
                } break;
                case "PUSH19": {
                    this.stack.push(opCode.pushData.toString('hex'));
                    pseudoInstruction.text = "stack.push(" + opCode.pushData.toString('hex') + ");";
                    pseudoInstruction.debug = true;
                } break;
                case "PUSH20": {
                    this.stack.push(opCode.pushData.toString('hex'));
                    pseudoInstruction.text = "stack.push(" + opCode.pushData.toString('hex') + ");";
                    pseudoInstruction.debug = true;
                } break;
                case "PUSH21": {
                    this.stack.push(opCode.pushData.toString('hex'));
                    pseudoInstruction.text = "stack.push(" + opCode.pushData.toString('hex') + ");";
                    pseudoInstruction.debug = true;
                } break;
                case "PUSH22": {
                    this.stack.push(opCode.pushData.toString('hex'));
                    pseudoInstruction.text = "stack.push(" + opCode.pushData.toString('hex') + ");";
                    pseudoInstruction.debug = true;
                } break;
                case "PUSH23": {
                    this.stack.push(opCode.pushData.toString('hex'));
                    pseudoInstruction.text = "stack.push(" + opCode.pushData.toString('hex') + ");";
                    pseudoInstruction.debug = true;
                } break;
                case "PUSH24": {
                    this.stack.push(opCode.pushData.toString('hex'));
                    pseudoInstruction.text = "stack.push(" + opCode.pushData.toString('hex') + ");";
                    pseudoInstruction.debug = true;
                } break;
                case "PUSH25": {
                    this.stack.push(opCode.pushData.toString('hex'));
                    pseudoInstruction.text = "stack.push(" + opCode.pushData.toString('hex') + ");";
                    pseudoInstruction.debug = true;
                } break;
                case "PUSH26": {
                    this.stack.push(opCode.pushData.toString('hex'));
                    pseudoInstruction.text = "stack.push(" + opCode.pushData.toString('hex') + ");";
                    pseudoInstruction.debug = true;
                } break;
                case "PUSH27": {
                    this.stack.push(opCode.pushData.toString('hex'));
                    pseudoInstruction.text = "stack.push(" + opCode.pushData.toString('hex') + ");";
                    pseudoInstruction.debug = true;
                } break;
                case "PUSH28": {
                    this.stack.push(opCode.pushData.toString('hex'));
                    pseudoInstruction.text = "stack.push(" + opCode.pushData.toString('hex') + ");";
                    pseudoInstruction.debug = true;
                } break;
                case "PUSH29": {
                    this.stack.push(opCode.pushData.toString('hex'));
                    pseudoInstruction.text = "stack.push(" + opCode.pushData.toString('hex') + ");";
                    pseudoInstruction.debug = true;
                } break;
                case "PUSH30": {
                    this.stack.push(opCode.pushData.toString('hex'));
                    pseudoInstruction.text = "stack.push(" + opCode.pushData.toString('hex') + ");";
                    pseudoInstruction.debug = true;
                } break;
                case "PUSH31": {
                    this.stack.push(opCode.pushData.toString('hex'));
                    pseudoInstruction.text = "stack.push(" + opCode.pushData.toString('hex') + ");";
                    pseudoInstruction.debug = true;
                } break;
                case "PUSH32": {
                    this.stack.push(opCode.pushData.toString('hex'));
                    pseudoInstruction.text = "stack.push(" + opCode.pushData.toString('hex') + ");";
                    pseudoInstruction.debug = true;
                } break;
                case "DUP1": {
                    const stackItem = this.stack[this.stack.length-1];
                    this.stack.push(stackItem);
                    pseudoInstruction.text = "stack.push(" + stackItem.toString('hex') + ");";
                    pseudoInstruction.debug = true;
                } break;
                case "DUP2": {
                    const stackItem = this.stack[this.stack.length-2];
                    this.stack.push(stackItem);
                    pseudoInstruction.text = "stack.push(" + stackItem.toString('hex') + ");";
                    pseudoInstruction.debug = true;
                } break;
                case "DUP3": {
                    const stackItem = this.stack[this.stack.length-3];
                    this.stack.push(stackItem);
                    pseudoInstruction.text = "stack.push(" + stackItem.toString('hex') + ");";
                    pseudoInstruction.debug = true;
                } break;
                case "DUP4": {
                    const stackItem = this.stack[this.stack.length-4];
                    this.stack.push(stackItem);
                    pseudoInstruction.text = "stack.push(" + stackItem.toString('hex') + ");";
                    pseudoInstruction.debug = true;
                } break;
                case "DUP5": {
                    const stackItem = this.stack[this.stack.length-5];
                    this.stack.push(stackItem);
                    pseudoInstruction.text = "stack.push(" + stackItem.toString('hex') + ");";
                    pseudoInstruction.debug = true;
                } break;
                case "DUP6": {
                    const stackItem = this.stack[this.stack.length-6];
                    this.stack.push(stackItem);
                    pseudoInstruction.text = "stack.push(" + stackItem.toString('hex') + ");";
                    pseudoInstruction.debug = true;
                } break;
                case "DUP7": {
                    const stackItem = this.stack[this.stack.length-7];
                    this.stack.push(stackItem);
                    pseudoInstruction.text = "stack.push(" + stackItem.toString('hex') + ");";
                    pseudoInstruction.debug = true;
                } break;
                case "DUP8": {
                    const stackItem = this.stack[this.stack.length-8];
                    this.stack.push(stackItem);
                    pseudoInstruction.text = "stack.push(" + stackItem.toString('hex') + ");";
                    pseudoInstruction.debug = true;
                } break;
                case "DUP9": {
                    const stackItem = this.stack[this.stack.length-9];
                    this.stack.push(stackItem);
                    pseudoInstruction.text = "stack.push(" + stackItem.toString('hex') + ");";
                    pseudoInstruction.debug = true;
                } break;
                case "DUP10": {
                    const stackItem = this.stack[this.stack.length-10];
                    this.stack.push(stackItem);
                    pseudoInstruction.text = "stack.push(" + stackItem.toString('hex') + ");";
                    pseudoInstruction.debug = true;
                } break;
                case "DUP11": {
                    const stackItem = this.stack[this.stack.length-11];
                    this.stack.push(stackItem);
                    pseudoInstruction.text = "stack.push(" + stackItem.toString('hex') + ");";
                    pseudoInstruction.debug = true;
                } break;
                case "DUP12": {
                    const stackItem = this.stack[this.stack.length-12];
                    this.stack.push(stackItem);
                    pseudoInstruction.text = "stack.push(" + stackItem.toString('hex') + ");";
                    pseudoInstruction.debug = true;
                } break;
                case "DUP13": {
                    const stackItem = this.stack[this.stack.length-13];
                    this.stack.push(stackItem);
                    pseudoInstruction.text = "stack.push(" + stackItem.toString('hex') + ");";
                    pseudoInstruction.debug = true;
                } break;
                case "DUP14": {
                    const stackItem = this.stack[this.stack.length-14];
                    this.stack.push(stackItem);
                    pseudoInstruction.text = "stack.push(" + stackItem.toString('hex') + ");";
                    pseudoInstruction.debug = true;
                } break;
                case "DUP15": {
                    const stackItem = this.stack[this.stack.length-15];
                    this.stack.push(stackItem);
                    pseudoInstruction.text = "stack.push(" + stackItem.toString('hex') + ");";
                    pseudoInstruction.debug = true;
                } break;
                case "DUP16": {
                    const stackItem = this.stack[this.stack.length-16];
                    this.stack.push(stackItem);
                    pseudoInstruction.text = "stack.push(" + stackItem.toString('hex') + ");";
                    pseudoInstruction.debug = true;
                } break;
                case "SWAP1": {
                    const stackItem1 = this.stack[this.stack.length-1];
                    const stackItem2 = this.stack[this.stack.length-2];
                    this.stack[this.stack.length-2] = stackItem1;
                    this.stack[this.stack.length-1] = stackItem2;
                    pseudoInstruction.text = "stack[0] = " + stackItem2 + "; stack[1] = " + stackItem1 + ";";
                    pseudoInstruction.debug = true;
                } break;
                case "SWAP2": {
                    const stackItem1 = this.stack[this.stack.length-1];
                    const stackItem3 = this.stack[this.stack.length-3];
                    this.stack[this.stack.length-3] = stackItem1;
                    this.stack[this.stack.length-1] = stackItem3;
                    pseudoInstruction.text = "stack[0] = " + stackItem3 + "; stack[2] = " + stackItem1 + ";";
                    pseudoInstruction.debug = true;
                } break;
                case "SWAP3": {
                    const stackItem1 = this.stack[this.stack.length-1];
                    const stackItem4 = this.stack[this.stack.length-4];
                    this.stack[this.stack.length-4] = stackItem1;
                    this.stack[this.stack.length-1] = stackItem4;
                    pseudoInstruction.text = "stack[0] = " + stackItem4 + "; stack[3] = " + stackItem1 + ";";
                    pseudoInstruction.debug = true;
                } break;
                case "SWAP4": {
                    const stackItem1 = this.stack[this.stack.length-1];
                    const stackItem5 = this.stack[this.stack.length-5];
                    this.stack[this.stack.length-5] = stackItem1;
                    this.stack[this.stack.length-1] = stackItem5;
                    pseudoInstruction.text = "stack[0] = " + stackItem5 + "; stack[4] = " + stackItem1 + ";";
                    pseudoInstruction.debug = true;
                } break;
                case "SWAP5": {
                    const stackItem1 = this.stack[this.stack.length-1];
                    const stackItem6 = this.stack[this.stack.length-6];
                    this.stack[this.stack.length-6] = stackItem1;
                    this.stack[this.stack.length-1] = stackItem6;
                    pseudoInstruction.text = "stack[0] = " + stackItem6 + "; stack[5] = " + stackItem1 + ";";
                    pseudoInstruction.debug = true;
                } break;
                case "SWAP6": {
                    const stackItem1 = this.stack[this.stack.length-1];
                    const stackItem7 = this.stack[this.stack.length-7];
                    this.stack[this.stack.length-7] = stackItem1;
                    this.stack[this.stack.length-1] = stackItem7;
                    pseudoInstruction.text = "stack[0] = " + stackItem7 + "; stack[6] = " + stackItem1 + ";";
                    pseudoInstruction.debug = true;
                } break;
                case "SWAP7": {
                    const stackItem1 = this.stack[this.stack.length-1];
                    const stackItem8 = this.stack[this.stack.length-8];
                    this.stack[this.stack.length-8] = stackItem1;
                    this.stack[this.stack.length-1] = stackItem8;
                    pseudoInstruction.text = "stack[0] = " + stackItem8 + "; stack[7] = " + stackItem1 + ";";
                    pseudoInstruction.debug = true;
                } break;
                case "SWAP8": {
                    const stackItem1 = this.stack[this.stack.length-1];
                    const stackItem9 = this.stack[this.stack.length-9];
                    this.stack[this.stack.length-9] = stackItem1;
                    this.stack[this.stack.length-1] = stackItem9;
                    pseudoInstruction.text = "stack[0] = " + stackItem9 + "; stack[8] = " + stackItem1 + ";";
                    pseudoInstruction.debug = true;
                } break;
                case "SWAP9": {
                    const stackItem1 = this.stack[this.stack.length-1];
                    const stackItem10 = this.stack[this.stack.length-10];
                    this.stack[this.stack.length-10] = stackItem1;
                    this.stack[this.stack.length-1] = stackItem10;
                    pseudoInstruction.text = "stack[0] = " + stackItem10 + "; stack[9] = " + stackItem1 + ";";
                    pseudoInstruction.debug = true;
                } break;
                case "SWAP10": {
                    const stackItem1 = this.stack[this.stack.length-1];
                    const stackItem11 = this.stack[this.stack.length-11];
                    this.stack[this.stack.length-11] = stackItem1;
                    this.stack[this.stack.length-1] = stackItem11;
                    pseudoInstruction.text = "stack[0] = " + stackItem11 + "; stack[10] = " + stackItem1 + ";";
                    pseudoInstruction.debug = true;
                } break;
                case "SWAP11": {
                    const stackItem1 = this.stack[this.stack.length-1];
                    const stackItem12 = this.stack[this.stack.length-12];
                    this.stack[this.stack.length-12] = stackItem1;
                    this.stack[this.stack.length-1] = stackItem12;
                    pseudoInstruction.text = "stack[0] = " + stackItem12 + "; stack[11] = " + stackItem1 + ";";
                    pseudoInstruction.debug = true;
                } break;
                case "SWAP12": {
                    const stackItem1 = this.stack[this.stack.length-1];
                    const stackItem13 = this.stack[this.stack.length-13];
                    this.stack[this.stack.length-13] = stackItem1;
                    this.stack[this.stack.length-1] = stackItem13;
                    pseudoInstruction.text = "stack[0] = " + stackItem13 + "; stack[12] = " + stackItem1 + ";";
                    pseudoInstruction.debug = true;
                } break;
                case "SWAP13": {
                    const stackItem1 = this.stack[this.stack.length-1];
                    const stackItem14 = this.stack[this.stack.length-14];
                    this.stack[this.stack.length-14] = stackItem1;
                    this.stack[this.stack.length-1] = stackItem14;
                    pseudoInstruction.text = "stack[0] = " + stackItem14 + "; stack[13] = " + stackItem1 + ";";
                    pseudoInstruction.debug = true;
                } break;
                case "SWAP14": {
                    const stackItem1 = this.stack[this.stack.length-1];
                    const stackItem15 = this.stack[this.stack.length-15];
                    this.stack[this.stack.length-15] = stackItem1;
                    this.stack[this.stack.length-1] = stackItem15;
                    pseudoInstruction.text = "stack[0] = " + stackItem15 + "; stack[14] = " + stackItem1 + ";";
                    pseudoInstruction.debug = true;
                } break;
                case "SWAP15": {
                    const stackItem1 = this.stack[this.stack.length-1];
                    const stackItem16 = this.stack[this.stack.length-16];
                    this.stack[this.stack.length-16] = stackItem1;
                    this.stack[this.stack.length-1] = stackItem16;
                    pseudoInstruction.text = "stack[0] = " + stackItem16 + "; stack[15] = " + stackItem1 + ";";
                    pseudoInstruction.debug = true;
                } break;
                case "SWAP16": {
                    const stackItem1 = this.stack[this.stack.length-1];
                    const stackItem17 = this.stack[this.stack.length-17];
                    this.stack[this.stack.length-17] = stackItem1;
                    this.stack[this.stack.length-1] = stackItem17;
                    pseudoInstruction.text = "stack[0] = " + stackItem17 + "; stack[16] = " + stackItem1 + ";";
                    pseudoInstruction.debug = true;
                } break;
                case "LOG0": {
                    const memoryStart = this.stack.pop();
                    const memoryLength = this.stack.pop();
                    pseudoInstruction.text = "log(memory[" + memoryStart + ",(" + memoryStart + "+" + memoryLength + ")]);";
                } break;
                case "LOG1": {
                    const memoryStart = this.stack.pop();
                    const memoryLength = this.stack.pop();
                    const topic1 = this.stack.pop();
                    pseudoInstruction.text = "log(memory[" + memoryStart + ",(" + memoryStart + "+" + memoryLength + ")]," + topic1 + ");";
                } break;
                case "LOG2": {
                    const memoryStart = this.stack.pop();
                    const memoryLength = this.stack.pop();
                    const topic1 = this.stack.pop();
                    const topic2 = this.stack.pop();
                    pseudoInstruction.text = "log(memory[" + memoryStart + ",(" + memoryStart + "+" + memoryLength + ")]," + topic1 + "," + topic2 + ");";
                } break;
                case "LOG3": {
                    const memoryStart = this.stack.pop();
                    const memoryLength = this.stack.pop();
                    const topic1 = this.stack.pop();
                    const topic2 = this.stack.pop();
                    const topic3 = this.stack.pop();
                    pseudoInstruction.text = "log(memory[" + memoryStart + ",(" + memoryStart + "+" + memoryLength + ")]," + topic1 + "," + topic2 + "," + topic3 + ");";
                } break;
                case "LOG4": {
                    const memoryStart = this.stack.pop();
                    const memoryLength = this.stack.pop();
                    const topic1 = this.stack.pop();
                    const topic2 = this.stack.pop();
                    const topic3 = this.stack.pop();
                    const topic4 = this.stack.pop();
                    pseudoInstruction.text = "log(memory[" + memoryStart + ",(" + memoryStart + "+" + memoryLength + ")]," + topic1 + "," + topic2 + "," + topic3 + "," + topic4 + ");";
                } break;
                case "CALL": {
                    const gas = this.stack.pop();
                    const address = this.stack.pop();
                    const value = this.stack.pop();
                    const memoryStart = this.stack.pop();
                    const memoryLength = this.stack.pop();
                    const outputStart = this.stack.pop();
                    const outputLength = this.stack.pop();
                    this.stack.push("call(" + gas + "," + address + "," + value + "," + memoryStart + "," + memoryLength + "," + outputStart + "," + outputLength + ")");
                    pseudoInstruction.text = "stack.push(call(" + gas + "," + address + "," + value + "," + memoryStart + "," + memoryLength + "," + outputStart + "," + outputLength + "))";
                    pseudoInstruction.debug = true;
                } break;
                case "RETURN": {
                    const memoryLocationStart = this.stack.pop();
                    const memoryLocationLength = this.stack.pop();
                    if(!isNaN(parseInt(memoryLocationStart,16)) && !isNaN(parseInt(memoryLocationLength,16))) {
                        pseudoInstruction.text = "return memory[0x" + memoryLocationStart + ":0x" + (parseInt(memoryLocationStart,16)+parseInt(memoryLocationLength,16)).toString(16) + ")];";
                    } else {
                        pseudoInstruction.text = "return memory[0x" + memoryLocationStart + ":(0x" + memoryLocationStart + "+0x" + memoryLocationLength + ")];";
                    }
                    pseudoInstruction.halt = true;
                } break;
                case "REVERT": {
                    const memoryLocationStart = this.stack.pop();
                    const memoryLocationLength = this.stack.pop();
                    if(memoryLocationStart == '00' && memoryLocationLength == '00') {
                        pseudoInstruction.text = "revert();";
                    } else if(memoryLocationStart == '00') {
                        pseudoInstruction.text = "revert(); return memory.substring(0," + memoryLocationLength + ");";
                    } else {
                        pseudoInstruction.text = "revert(); return memory.substring(" + memoryLocationStart + ",(" + memoryLocationStart + "+" + memoryLocationLength + "));";
                    }
                    pseudoInstruction.halt = true;
                } break;
                case "INVALID": {
                    pseudoInstruction.text = "INVALID? (" + opCode.opcode.toString(16) + ")";
                } break;
                case "SELFDESTRUCT": {
                    const address = this.stack.pop();
                    pseudoInstruction.text = "selfdestruct(" + address + ");";
                } break;
                default: {
                    console.error("Error: " + opCode.name + " not implemented");
                    process.exit();
                    pseudoInstruction.text = opCode.name + (opCode.pushData ? " 0x" + opCode.pushData.toString('hex') : "");
                }
            }
            this.pseudoInstructions.push(pseudoInstruction);
            if(pseudoInstruction.halt) break;
        }
        return this.pseudoInstructions;
    }

    toString(debug = false) {
        let pseudoInstructions = this.pseudoInstructions;
        if(pseudoInstructions.length == 0) {
            this.run();
            pseudoInstructions = this.pseudoInstructions;
        }
        return parseFunctions(stringifyInstructions(pseudoInstructions,debug));
    }
}

module.exports = EVM;