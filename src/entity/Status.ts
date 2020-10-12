export class Status {
  public readonly status: string = '';
  constructor(status: string) {
    this.status = status;
  }
  public adaptHex(hex: string): string {
    if (!hex) return ''
    return hex.length > 1 ? hex : `0${hex}`;
  }
}
