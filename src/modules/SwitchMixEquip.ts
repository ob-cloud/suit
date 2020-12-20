/*
 * @Author: eamiear
 * @Date: 2020-08-29 20:16:40
 * @Last Modified by: eamiear
 * @Last Modified time: 2020-12-18 15:38:27
 */
import { SwitchMixStatus } from '../entity/SwitchMixStatus';
import { OrderEnum } from '../entity/SwitchStatus';
import { BaseEquip } from './BaseEquip';

// 按键类型索引 3|3
// 开关|情景|单线|插座|雷达
enum SwitchKeyTypeIndex {
  SWITCH = 0, // 普通
  SCENE = 1, // 情景
  LINE = 2, // 单线
  SOCKET = 3, // 插座
  RADAR = 4, // 雷达
}

// 开关类型
const SwitchKeyTypeIndexMap: any = {
  [SwitchKeyTypeIndex.SWITCH]: 'switch',
  [SwitchKeyTypeIndex.SCENE]: 'scene',
  [SwitchKeyTypeIndex.LINE]: 'line',
  [SwitchKeyTypeIndex.SOCKET]: 'socket',
  [SwitchKeyTypeIndex.RADAR]: 'radar',
}
const SwitchTypeIndexObj: any = {
  switch: 0,
  scene: 0,
  line: 0,
  socket: 0,
  radar: 0
}

// 按键状态
enum SwitchKeyStatus {
  ON = 1,
  OFF = 0
}
const SwitchKeyStatusMap: any = {
  [SwitchKeyStatus.ON]: '开',
  [SwitchKeyStatus.OFF]: '关'
}

const DEFAULT_KEY_COUNT = 0 // 默认按键数

// 按键类型范式
enum KeyTypePatternEnum {
  SWITCH = '10',
  SCENE = '01',
  SWITCHSCENE = '11',
  LINE = '001',
  SOCKET = '0001',
  SWITCHRADAR = '10001',
  SCENERADAR = '01001'
}

export class SwitchMixEquip extends BaseEquip {
  switchStatus: SwitchMixStatus;
  typeStr: any;
  bytes = `{0}{1}000000000000`;
  /**
   * 面板开关(普通开关、情景开关、单线开关、混合开关[普通+情景])
   * @param status 状态
   * @param deviceType 主类型
   * @param deviceChildType 子类型
   */
  constructor(status: string, deviceType ? : string, deviceChildType ? : string) {
    super(status, deviceType, deviceChildType)
    this.typeStr = this.TypeHints.getSocketSwitchTypeIndex(deviceType, deviceChildType)
    this.switchStatus = new SwitchMixStatus(status, this.orderCount)
  }
  /**
   * 类型索引 1|3
   */
  get typeIndex() {
    return this.typeStr
  }
  /**
   * 开关类型标志
   * {
   *   switch: 1,
   *   scene: 0
   * }
   */
  get keyTypes() {
    if (!this.typeStr) return ''
    const types = this.typeStr.split('|')
    const typeObj = {
      ...SwitchTypeIndexObj
    }
    for (let index = 0; index < types.length; index++) {
      typeObj[SwitchKeyTypeIndexMap[index]] = +!!types[index]
    }
    return typeObj
  }
  // 类型范式 [3, 3] => '11', [3, 0] => '10', [0, 3] => '01'...
  get keyTypePattern() {
    let keys = this.typeStr.split('|')
    const keyList = [] // [3, 0, 2] => [1, 0, 1]
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index]
      keyList[index] = +key ? 1 : 0
    }
    return keyList.join('')
  }
  /**
   * 按键列表
   * ['00', '01', '10', '11']
   */
  get keyDots() {
    return this.switchStatus.keyDots.concat(this.switchStatus.extraKeyDots || [])
  }
  /**
   * 按键总数
   */
  get keyCount() {
    if (!this.typeStr || !this.typeStr.length) return DEFAULT_KEY_COUNT
    let keys = this.typeStr.split('|')
    keys = keys.filter((it: any) => it)
    return +keys.reduce((a: any, b: any) => +a + (+b)) || DEFAULT_KEY_COUNT
  }
  /**
   * 获取各类型按键数量列表 [2,3] -> [开关, 情景]
   */
  get _keyCountList() {
    if (!this.typeStr || !this.typeStr.length) return [DEFAULT_KEY_COUNT]
    let keys = this.typeStr.split('|')
    const keyList = []
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index]
      keyList[index] = +key ? +key : DEFAULT_KEY_COUNT
    }
    return keyList
  }
  /**
   * 按键数列表，按主程类型排序
   *
   * 开关类型 - 开关为主入口
   * 情景类型 - 情景为主入口
   * 混合类型 - 情景为主入口
   * 单线开关 - 开关
   * 插座开关 - 插座
   */
  get orderCount(): number[] {
    const countList = this._keyCountList
    if (!countList.length) return []
    // 开关
    if (countList.length === 1 || this.isSwitch) return countList

    // 主要主程
    if (this.isScene || this.isSwitchScene || this.isLine || this.isSocket) return countList.reverse().slice(0, 2)

    // 雷达主程
    if (this.isRadar) return [countList.find(i => !!i) || DEFAULT_KEY_COUNT]
    return []
  }
  get isSwitch () {
    return this.keyTypePattern === KeyTypePatternEnum.SWITCH
  }
  get isScene () {
    return this.keyTypePattern === KeyTypePatternEnum.SCENE
  }
  get isSwitchScene () {
    return this.keyTypePattern === KeyTypePatternEnum.SWITCHSCENE
  }
  get isLine () {
    return this.keyTypePattern === KeyTypePatternEnum.LINE
  }
  get isSocket () {
    return this.keyTypePattern === KeyTypePatternEnum.SOCKET
  }
  get isRadar () {
    return [`${KeyTypePatternEnum.SWITCHRADAR}`, `${KeyTypePatternEnum.SCENERADAR}`].includes(this.keyTypePattern)
  }
  /**
   * 设置按键位
   * @param v 值
   * @param index 索引
   * @param t 非主程类型 > 0 的任意值
   */
  setPower(v: number, index: number, t ? : number) {
    const vb = new this.Converter(`${v}`, 10).toBinary()
    const setMethod = t ? 'setExtraKeyDots' : 'setKeyDot'
    const idx = t ? index - this.orderCount[OrderEnum.Primary] : index
    this.switchStatus[setMethod](vb, idx)
    return this
  }
  /**
   * 获取按键值 ['1', '0', '1']
   * @param index 索引
   * @param t  非主程类型 > 0 的任意值
   */
  getPower(index ? : number, t ? : number): Array < string > {
    if (index !== undefined) {
      const getMethod = t ? 'getExtraKeyDotByIndex' : 'getKeyDotByIndex'
      const idx = t ? index - this.orderCount[0] : index
      const v = this.switchStatus[getMethod](idx)
      const vd = new this.Converter(`${v}`, 2).toDecimal()
      return [vd]
    } else {
      return this.keyDots.map(item => new this.Converter(`${item}`, 2).toDecimal())
    }
  }
  /**
   * 获取按键位整型值  [1, 0, 1]
   * @param index 索引
   * @param t  非主程类型 > 0 的任意值
   */
  getPowerInt(index ? : number, t ? : number): Array < number > {
    const powers = this.getPower(index, t)
    return powers.map(item => +item > 1 ? 0 : +item)
  }

  /**
   * 获取状态描述
   */
  getStatusDescriptor() {
    const power = this.getPowerInt()
    return power.map(p => SwitchKeyStatusMap[p]).join(',')
  }

  getBytes() {
    const keyDots = this.switchStatus.keyDots.reverse()
    const extraDots = this.switchStatus.extraKeyDots.reverse()
    const status = new this.Converter(keyDots.join('') || '00', 2).toHex()
    const extraStatus = new this.Converter(extraDots.join('') || '00', 2).toHex()
    return this.bytes.format(status, extraStatus)
  }
}
