/*
 * @Author: eamiear
 * @Date: 2020-08-29 17:46:03
 * @Last Modified by: eamiear
 * @Last Modified time: 2020-12-17 16:57:01
 */

import { SwitchStatus } from './SwitchStatus';
/**
 * 情景 + 开关
 */
export class SwitchSceneStatus extends SwitchStatus {
  public state: string = '';
  extraState: string;
  extraCount: number;
  extraKeyDots: string[];
  constructor (status: string, count?: Array<number>, typeIndex?: string) {
    super(status, count, typeIndex)
    this.extraCount = this.count[1] || 0
    this.extraState = status.slice(2, 4)
    this.extraKeyDots = this.__parseKeyDots(this.extraState, this.extraCount)
  }

  setExtraKeyDots (v: string, index: number): SwitchSceneStatus {
    if (index + 1 > this.extraCount) return this
    this.extraKeyDots[index] = v.toEven()
    return this
  }

  getExtraKeyDotByIndex (index: number) {
    if (index + 1 > this.extraCount) return
    return this.extraKeyDots[index]
  }

  getExtraState () {
    return this.extraState
  }
}
