interface String {
  toCapital(): string;
  toLower(): string;
  padLeft(maxLength:number): string;
  padRight(maxLength:number): string;
  toHexNumber(): string;
  toEven(): string;
  toEvenHex(): string;
  toEvenHexWithArray(hex: Array<string>): string;
  format(..._args: string[]): string;
}
