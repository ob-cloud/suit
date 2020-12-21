import { Converter } from "../utils/converter";

export class Status {
  public readonly status: string = '';
  constructor(status: string) {
    status = status.length < 16 ? status.padRight(16) : status
    this.status = status;
  }
  /**
   * 根据给定数量值，将16进制状态解析成二进制状态码，
   * 并反正顺序返回 ['01', '11', '10', '00'] => ["00", "10", "11", "01"]
   * @param state 16进制状态码('01')
   * @param count 码数量
   * @param splitSize 分割位数
   */
  __parseBitState (state: string, count: number, splitSize: number = 2) {
    let keyList = []
    const converter = new Converter(state || '00', 16)
    const bits = converter.fill(8, converter.toBinary())
    let i = 0
    for (let index = count; index > 0; index--) {
      keyList.push(bits.slice(bits.length - splitSize * (i + 1), bits.length - splitSize * i))
      i += 1
    }
    if (splitSize === 1) keyList = keyList.map(k => this.adaptHex(k))
    return keyList
  }
  public adaptHex(hex: string): string {
    if (!hex) return ''
    return hex.length > 1 ? hex : `0${hex}`;
  }
}
