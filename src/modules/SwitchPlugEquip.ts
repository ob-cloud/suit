/*
 * @Author: eamiear
 * @Date: 2020-12-18 14:24:35
 * @Last Modified by: eamiear
 * @Last Modified time: 2020-12-18 15:54:10
 */
import { SwitchPlugStatus } from '../entity/SwitchPlugStatus';
import { SwitchMixEquip } from './SwitchMixEquip';

enum PlugStatus {
  ON = 1,
  OFF = 0
}

const SwitchPlugStatusMap: any = {
  [PlugStatus.ON]: '开',
  [PlugStatus.OFF]: '关'
}

export class SwitchPlugEquip extends SwitchMixEquip {
  typeStr: any;
  // private bytes = `{0}00000000000000`;
  constructor(status: string, deviceType?: string, deviceChildType?: string) {
    super(status, deviceType, deviceChildType)
    // this.typeStr = this.TypeHints.getSocketSwitchTypeIndex(deviceType, deviceChildType)
    this.switchStatus = new SwitchPlugStatus(status, this.orderCount)
    this.bytes = `0000{0}0000000000`
  }
  // /**
  //  * 类型索引 1|3
  //  */
  // get typeIndex () {
  //   return this.typeStr
  // }
  // /**
  //  * 按键列表
  //  * ['00', '01', '10', '11']
  //  */
  // get keyDots () {
  //   return this.switchStatus.keyDots
  // }
  // /**
  //  * 按键总数
  //  */
  // get keyCount () {
  //   return +this._getKeyCount()
  // }
  // /**
  //  * 获取各类型按键数量列表 [2,3] -> [开关, 情景]
  //  */
  // get _keyCountList () {
  //   if (!this.typeStr || !this.typeStr.length) return [1]
  //   let keys = this.typeStr.split('|')
  //   const keyList = []
  //   for (let index = 0; index < keys.length; index++) {
  //     const key = keys[index]
  //     keyList[index] = +key ? +key : 0
  //   }
  //   return keyList
  // }
  // /**
  //  * 按键数列表，按主程类型排序
  //  *
  //  * 开关类型 - 开关为主入口
  //  * 情景类型 - 情景为主入口
  //  * 混合类型 - 情景为主入口
  //  */
  // get orderCount () {
  //   const countList = this._keyCountList
  //   return countList.length && countList.length === 2 ? countList.reverse() : countList
  // }
  // /**
  //  * 获取按键总数
  //  */
  // private _getKeyCount () {
  //   if (!this.typeStr || !this.typeStr.length) return 1
  //   let keys = this.typeStr.split('|')
  //   keys = keys.filter((it: any) => it)
  //   return keys.reduce((a:any, b:any) => +a + (+b)) || 1
  // }
  // /**
  //  * 设置按键位
  //  * @param v 值
  //  * @param index 索引
  //  * @param t 非主程类型 > 0 的任意值
  //  */
  // setPower (v: number, index: number, t?: number) {
  //   const vb = new this.Converter(`${v}`, 10).toBinary()
  //   this.switchStatus.setKeyDot(vb, index)
  //   return this
  // }
  // /**
  //  * 获取按键值 ['1', '0', '1']
  //  * @param index 索引
  //  * @param t  非主程类型 > 0 的任意值
  //  */
  // getPower (index?: number, t?: number): Array<string> {
  //   if (index !== undefined) {
  //     const v = this.switchStatus.getKeyDotByIndex(index)
  //     const vd = new this.Converter(`${v}`, 2).toDecimal()
  //     return [vd]
  //   } else {
  //     return this.keyDots.map(item =>  new this.Converter(`${item}`, 2).toDecimal())
  //   }
  // }
  // /**
  //  * 获取按键位整型值  [1, 0, 1]
  //  * @param index 索引
  //  * @param t  非主程类型 > 0 的任意值
  //  */
  // getPowerInt (index?: number, t?: number): Array<number> {
  //   const powers = this.getPower(index, t)
  //   return powers.map(item => +item > 1 ? 0 : +item)
  // }

  /**
   * 获取状态描述
   */
  getStatusDescriptor () {
    const power = this.getPowerInt()
    return power.map(p => SwitchPlugStatusMap[p]).join(',')
  }

  getBytes () {
    const keyDots = this.switchStatus.keyDots.reverse()
    const status = new this.Converter(keyDots.join('') || '00', 2).toHex()
    return this.bytes.format(status)
  }
}
