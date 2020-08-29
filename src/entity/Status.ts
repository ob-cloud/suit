export class Status {
  public readonly status: string = '';
  constructor(status: string) {
    this.status = status;
  }
  public adaptHex(hex: string): string {
    if (!hex) return ''
    return hex.length > 1 ? hex : `0${hex}`;
  }
  /**
   * 转为短偶数位（01）
   * @param hex 十六进制数
   */
  public toShortEvenHex(hex: string): string {
    return this.adaptHex(hex)
  }
  /**
   * 转为长
   * @param hex 16进制数组
   */
  public toLongEvenHex(hex: Array<string>): string {
    if (!hex || !hex.length) return ''
    return hex.map(h => this.adaptHex(h)).join('')
  }
}
