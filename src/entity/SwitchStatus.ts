/*
 * @Author: eamiear
 * @Date: 2020-08-29 17:46:03
 * @Last Modified by: eamiear
 * @Last Modified time: 2020-12-21 17:19:55
 */

import { ScenePatterns } from '../modules/SwitchMixEquip';
import { Status } from './Status';

export enum OrderEnum {
  Primary = 0,
  Secondary = 1
}
/**
 * 开关 或 情景状态
 */
export class SwitchStatus extends Status {
  public state: string = '';
  pattern: string = ''; // 类型范式
  count: number[] = [1]; // 按键数列表 [3, 3] ---> 开关 3， 情景 3
  keyDots: string[]; // 按键字节位
  constructor (status: string, count?: Array<number>, pattern?: string) {
    super(status)
    this.state = status.slice(0, 2) || '00'
    this.count = count || [1]
    this.pattern = pattern || ''
    this.keyDots = this.getKeyDots()
  }
  // 主程按键数，普通开关面板 -> 开关，情景 -> 情景， 混合 -> 情景
  get _count () {
    return this.count[OrderEnum.Primary]
  }
  get _pattern (): string {
    return this.pattern
  }
  /**
   * 获取主程按键坑位，二进制码
   * 并获取按键正序
   * 情景 一个 bit 表示一个按键
   */
  private getKeyDots () {
    const bit = ScenePatterns.includes(this.pattern) ? 1 : 2
    return this.__parseBitState(this.state, this._count, bit)
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
