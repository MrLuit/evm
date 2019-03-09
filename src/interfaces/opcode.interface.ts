export default interface Opcode {
    pc: number;
    opcode: number;
    name: string;
    pushData?: Buffer;
}
