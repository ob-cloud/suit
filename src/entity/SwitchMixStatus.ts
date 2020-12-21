/*
 * @Author: eamiear
 * @Date: 2020-08-29 17:46:03
 * @Last Modified by: eamiear
 * @Last Modified time: 2020-12-21 16:10:33
 */

import { OrderEnum, SwitchStatus } from './SwitchStatus';

export class SwitchMixStatus extends SwitchStatus {
  extraState: string; // 次级状态（非主程）
  extraKeyDots: string[]; // 按键列表
  /**
   * 混合面板(情景 + 开关)
   * @param status 状态码
   * @param count 按键数量列表
   * @param pattern 类型范式
   */
  constructor (status: string, count?: Array<number>, pattern?: string) {
    super(status, count, pattern)
    this.extraState = status.slice(2, 4)
    this.extraKeyDots = this.__parseBitState(this.extraState, this.extraCount)
  }

  // 非主程面板按键数
  get extraCount(): number {
    return this.count[OrderEnum.Secondary] || 0
  }
  /**
   * 设置按键值
   * @param v 二进制值
   * @param index 索引
   */
  setExtraKeyDots (v: string, index: number): SwitchMixStatus {
    if (index + 1 > this.extraCount) return this
    this.extraKeyDots[index] = v.toEven()
    return this
  }
  /**
   * 获取按键值
   * @param index 索引
   */
  getExtraKeyDotByIndex (index: number) {
    if (index + 1 > this.extraCount) return
    return this.extraKeyDots[index]
  }

  getExtraState () {
    return this.extraState
  }
}
