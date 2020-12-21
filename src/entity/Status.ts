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
   */
  __parseBitState (state: string, count: number) {
    let keyList = []
    const converter = new Converter(state || '00', 16)
    const bits = converter.fillBinary(converter.toBinary())
    // let i = 0
    // for (let index = 0; index < count; index++) {
    //   keyList[index] = bits.slice(i, i + 2)
    //   i += 2
    // }
    // return keyList.reverse()
    for (let index = count; index > 0; index--) {
      keyList.push(bits.slice(bits.length - 2, bits.length))
    }
    return keyList
  }
  public adaptHex(hex: string): string {
    if (!hex) return ''
    return hex.length > 1 ? hex : `0${hex}`;
  }
}
