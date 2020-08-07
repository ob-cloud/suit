export declare class Converter {
    value: string;
    from: number;
    constructor(value: string, from: number);
    toBinary(): string;
    toOctal(): string;
    toDecimal(): string;
    toHex(): string;
    fill(len: any): string;
}
