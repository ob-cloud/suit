/*
 * @Author: eamiear
 * @Date: 2020-08-29 17:46:03
 * @Last Modified by: eamiear
 * @Last Modified time: 2020-12-17 16:38:25
 */

import { Converter } from '../utils/converter';
import { Status } from './Status';
/**
 * 开关 或 情景状态
 */
export class SwitchStatus extends Status {
  public state: string = '';
  keyDots: string[]; // 按键字节位
  typeIndex: string; // 类型索引 3|3
  count: number[] = [1]; // 按键数列表 [3, 3] ---> 开关 3， 情景 3
  private _count: number; // 主程按键数，普通开关面板 -> 开关，情景 -> 情景， 混合 -> 情景
  constructor (status: string, count?: Array<number>, typeIndex?: string) {
    super(status)
    this.state = status.slice(0, 2) || '00'
    this.count = count || [1]
    this._count = this.count[0]
    this.typeIndex = typeIndex || ''
    this.keyDots = this.getKeyDots()
  }
  /**
   * 解析按键坑位状态码
   * @param state 16进制状态码
   * @param count 按键数
   */
  __parseKeyDots (state: string, count: number) {
    let keyList = []
    const converter = new Converter(state, 16)
    const bits = converter.fillBinary(converter.toBinary())
    let i = 0
    for (let index = 0; index < count; index++) {
      keyList[index] = bits.slice(i, i + 2)
      i += 2
    }
    return keyList.reverse()
  }
  /**
   * 获取主程按键坑位，二进制码
   * 反转数组 ['01', '11', '10', '00'] => ["00", "10", "11", "01"]
   */
  private getKeyDots () {
    return this.__parseKeyDots(this.state, this._count)
  }
  /**
   * 设置按键值
   * @param v 二进制值
   * @param index 索引
   */
  setKeyDot (v: string, index: number): SwitchStatus {
    if (index + 1 > this._count) return this
    this.keyDots[index] = v.toEven()
    return this
  }
  /**
   * 获取按键值
   * @param index 索引
   */
  getKeyDotByIndex (index: number) {
    if (index + 1 > this._count) return
    return this.keyDots[index]
  }
  getState () {
    return this.state
  }
}
