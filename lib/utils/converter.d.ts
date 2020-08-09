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
export declare const toBinary: (value: string, from: number) => string;
export declare const toOctal: (value: string, from: number) => string;
export declare const toDecimal: (value: string, from: number) => string;
export declare const toHex: (value: string, from: number) => string;
export declare const fillLength: (value: string | number, len: number) => string;
