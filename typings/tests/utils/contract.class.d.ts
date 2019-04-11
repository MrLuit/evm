export default class Contract {
    private output;
    loadFile(filename: string): void;
    load(name: string, content: string): void;
    valid(): boolean;
    errors(): any;
    bytecode(): any;
}
