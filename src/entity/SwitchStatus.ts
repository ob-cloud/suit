/*
 * @Author: eamiear
 * @Date: 2020-08-29 17:46:03
 * @Last Modified by: eamiear
 * @Last Modified time: 2020-12-16 17:32:47
 */

import { Converter } from '../utils/converter';
import { Status } from './Status';
/**
 * TODO 开关
 */
export class SwitchStatus extends Status {
  public state: string = '';
  count: number = 1;
  keyDots: string[];
  constructor (status: string, count?: number) {
    super(status)
    this.state = status.slice(0, 2) || '00'
    this.count = count || 1
    this.keyDots = this.getKeyDots()
  }
  private getKeyDots () {
    const keyList = []
    const bits = new Converter(this.state, 16).toBinary()
    let i = 0
    for (let index = 0; index < this.count; index++) {
      keyList[index] = bits.slice(i, i + 2)
      i += 2
    }
    this.keyDots = keyList
    return keyList
  }
  setKeyDot (v: string, index: number) {
    if (index + 1 > this.count) return
    this.keyDots[index] = v.toEven()
  }
  getKeyDotByIndex (index: number) {
    if (index + 1 > this.count) return
    return this.keyDots[index]
  }
  getState () {
    return this.state
  }
}
