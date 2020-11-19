export class Status {
  public readonly status: string = '';
  constructor(status: string) {
    status = status.length < 16 ? status.padRight(16) : status
    this.status = status;
  }
  public adaptHex(hex: string): string {
    if (!hex) return ''
    return hex.length > 1 ? hex : `0${hex}`;
  }
}
