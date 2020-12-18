/*
 * @Author: eamiear
 * @Date: 2020-08-29 20:16:40
 * @Last Modified by: eamiear
 * @Last Modified time: 2020-12-18 11:54:41
 */
import { SwitchMixStatus } from '../entity/SwitchMixStatus';
import { BaseEquip } from './BaseEquip';

enum SwitchKeyStatus {
  ON = 1,
  OFF = 0
}

// 按键类型索引 3|3
enum SwitchKeyTypeIndex {
  NORMAL = 0, // 普通
  SCENE = 1 // 情景
}

const SwitchKeyTypeIndexMap:any = {
  [SwitchKeyTypeIndex.NORMAL]: 'normal',
  [SwitchKeyTypeIndex.SCENE]: 'scene'
}

const SwitchKeyStatusMap: any = {
  [SwitchKeyStatus.ON]: '开',
  [SwitchKeyStatus.OFF]: '关'
}

export class SwitchMixEquip extends BaseEquip {
  switchStatus: SwitchMixStatus;
  typeStr: any;
  private readonly bytes = `{0}{1}000000000000`;
  /**
   * 面板开关(普通开关、情景开关、混合开关[普通+情景])
   * @param status 状态
   * @param deviceType 主类型
   * @param deviceChildType 子类型
   */
  constructor(status: string, deviceType?: string, deviceChildType?: string) {
    super(status, deviceType, deviceChildType)
    this.typeStr = this.TypeHints.getSocketSwitchTypeIndex(deviceType, deviceChildType)
    this.switchStatus = new SwitchMixStatus(status, this.orderCount)
  }
  /**
   * 类型索引 1|3
   */
  get typeIndex () {
    return this.typeStr
  }
  /**
   * 开关类型标志
   * {
   *   normal: 1,
   *   scene: 0
   * }
   */
  get keyTypes () {
    if (!this.typeStr) return ''
    const types = this.typeStr.split('|')
    const typeObj:any = {
      normal: 0,
      scene: 0
    }
    for (let index = 0; index < types.length; index++) {
      const t = types[index]
      typeObj[SwitchKeyTypeIndexMap[index]] = +!!t
    }
    return typeObj
  }
  /**
   * 按键列表
   * ['00', '01', '10', '11']
   */
  get keyDots () {
    return this.switchStatus.keyDots.concat(this.switchStatus.extraKeyDots || [])
  }
  /**
   * 按键总数
   */
  get keyCount () {
    return +this._getKeyCount()
  }
  /**
   * 获取各类型按键数量列表 [2,3] -> [开关, 情景]
   */
  get _keyCountList () {
    if (!this.typeStr || !this.typeStr.length) return [1]
    let keys = this.typeStr.split('|')
    const keyList = []
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index]
      keyList[index] = +key ? +key : 0
    }
    return keyList
  }
  /**
   * 按键数列表，按主程类型排序
   *
   * 开关类型 - 开关为主入口
   * 情景类型 - 情景为主入口
   * 混合类型 - 情景为主入口
   */
  get orderCount () {
    const countList = this._keyCountList
    return countList.length && countList.length === 2 ? countList.reverse() : countList
  }
  /**
   * 获取按键总数
   */
  private _getKeyCount () {
    if (!this.typeStr || !this.typeStr.length) return 1
    let keys = this.typeStr.split('|')
    keys = keys.filter((it: any) => it)
    return keys.reduce((a:any, b:any) => +a + (+b)) || 1
  }
  /**
   * 设置按键位
   * @param v 值
   * @param index 索引
   * @param t 非主程类型 > 0 的任意值
   */
  setPower (v: number, index: number, t?: number) {
    const vb = new this.Converter(`${v}`, 10).toBinary()
    const setMethod = t ? 'setExtraKeyDots' : 'setKeyDot'
    const idx = t ? index - this.orderCount[0] : index
    this.switchStatus[setMethod](vb, idx)
    return this
  }
  /**
   * 获取按键值 ['1', '0', '1']
   * @param index 索引
   * @param t  非主程类型 > 0 的任意值
   */
  getPower (index?: number, t?: number): Array<string> {
    if (index !== undefined) {
      const getMethod = t ? 'getExtraKeyDotByIndex' : 'getKeyDotByIndex'
      const idx = t ? index - this.orderCount[0] : index
      const v = this.switchStatus[getMethod](idx)
      const vd = new this.Converter(`${v}`, 2).toDecimal()
      return [vd]
    } else {
      return this.keyDots.map(item =>  new this.Converter(`${item}`, 2).toDecimal())
    }
  }
  /**
   * 获取按键位整型值  [1, 0, 1]
   * @param index 索引
   * @param t  非主程类型 > 0 的任意值
   */
  getPowerInt (index?: number, t?: number): Array<number> {
    const powers = this.getPower(index, t)
    return powers.map(item => +item > 1 ? 0 : +item)
  }

  /**
   * 获取状态描述
   */
  getStatusDescriptor () {
    const power = this.getPowerInt()
    console.log('------ ', this.deviceChildType, power)
    return power.map(p => SwitchKeyStatusMap[p]).join(',')
  }

  getBytes () {
    const keyDots = this.switchStatus.keyDots.reverse()
    const extraDots = this.switchStatus.extraKeyDots.reverse()
    const status = new this.Converter(keyDots.join('') || '00', 2).toHex()
    const extraStatus = new this.Converter(extraDots.join('') || '00', 2).toHex()
    return this.bytes.format(status, extraStatus)
  }
}
