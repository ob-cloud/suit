interface String {
  toCapital(): string;
  toLower(): string;
  toHexNumber(): string;
  toEven(): string;
  toEvenHex(): string;
  toEvenHexWithArray(hex: Array<string>): string;
  format(..._args: string[]): string;
}
