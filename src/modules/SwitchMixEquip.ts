/*
 * @Author: eamiear
 * @Date: 2020-08-29 20:16:40
 * @Last Modified by: eamiear
 * @Last Modified time: 2020-12-22 15:01:33
 */
import { SwitchMixStatus } from '../entity/SwitchMixStatus';
import { OrderEnum } from '../entity/SwitchStatus';
import { BaseEquip } from './BaseEquip';

// 按键类型索引 3|3
// 开关|情景|单线|插座|雷达|红外|窗帘
enum SwitchKeyTypeIndex {
  SWITCH = 0, // 普通
  SCENE = 1, // 情景
  LINE = 2, // 单线
  SOCKET = 3, // 插座
  RADAR = 4, // 雷达
  INFRARED = 5, // 红外
  CURTAIN = 6, // 窗帘
}

// 开关类型
const SwitchKeyTypeIndexMap: any = {
  [SwitchKeyTypeIndex.SWITCH]: 'switch',
  [SwitchKeyTypeIndex.SCENE]: 'scene',
  [SwitchKeyTypeIndex.LINE]: 'line',
  [SwitchKeyTypeIndex.SOCKET]: 'socket',
  [SwitchKeyTypeIndex.RADAR]: 'radar',
  [SwitchKeyTypeIndex.INFRARED]: 'infrared',
  [SwitchKeyTypeIndex.CURTAIN]: 'curtain',
}
const SwitchTypeIndexObj: any = {
  switch: 0,
  scene: 0,
  line: 0,
  socket: 0,
  radar: 0,
  infrared: 0,
  curtain: 0
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
export enum KeyTypePatternEnum {
  SWITCH = '10',  // 开关
  SCENE = '01',   // 情景
  SWITCHSCENE = '11', // 开关 + 情景
  LINE = '001', // 单线
  SOCKET = '0001', // 插座
  SWITCHRADAR = '10001', // 雷达开关
  SCENERADAR = '01001', // 雷达情景
  SWITCHIR = '100001', // 红外开关
  SCENEIR = '010001', // 红外情景
  SWITCHSCENEIR = '110001', // 红外开关+情景
  SCENECURTAIN = '0100001', // 窗帘
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
   * @param flag 标志位
   */
  constructor(status: string, deviceType ? : string, deviceChildType ? : string, flag?: any) {
    super(status, deviceType, deviceChildType)
    this.typeStr = this.TypeHints.getSocketSwitchTypeIndex(deviceType, deviceChildType)
    this.switchStatus = new SwitchMixStatus(this.__parseStatus(status, flag), this.orderCount, this.keyTypePattern)
  }

  /**
   * 解析状态码，情景类型： 操作时置零，获取状态时不置零，其他类型不处理
   * @param status 状态码串
   * @param flag 是否
   */
  private __parseStatus (status: string, flag: boolean = false) {
    const isScene = this.isScene || this.isSwitchScene || this.isCurtain || this.isRadarScene || this.isInfraredScene
    if (isScene) {
      return !flag ? `00${status.slice(2)}` : status
    }
    return status
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
   * 获取各类型按键数量列表 [2,3,....] -> [开关, 情景,...]
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
    const countList = [...this._keyCountList]
    if (!countList.length) return []
    // 开关
    if (countList.length === 1 || this.isSwitch) return countList

    // 主要主程
    if (this.isScene || this.isSwitchScene || this.isLine || this.isSocket) return countList.reverse().slice(0, 2)

    // 雷达主程，取开关或情景值。 eg [1, 0, 0, 0, 1] || [0, 1, 0, 0, 1]
    if (this.isRadar) return [countList.find(i => !!i) || DEFAULT_KEY_COUNT]

    // 红外主程，取开关或情景值，两者包含取情景。 eg 100001, 010001, 110001
    if (this.isInfrared) {
      const list = countList.filter(i => i)
      if (list.length === 2) return [...list]
      if (list.length === 3) return list.slice(0, 2)
    }
    // 窗帘主程， 取情景。 2按键取3bit, 4按键取6bit
    if (this.isCurtain)  return [countList.find(i => !!i) || DEFAULT_KEY_COUNT]

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
    return this.isRadarSwitch || this.isRadarScene
  }
  get isRadarSwitch () {
    return this.keyTypePattern === KeyTypePatternEnum.SWITCHRADAR
  }
  get isRadarScene () {
    return this.keyTypePattern === KeyTypePatternEnum.SCENERADAR
  }
  get isInfrared () {
    return this.isInfraredSwitch || this.isInfraredScene
  }
  get isInfraredSwitch () {
    return this.keyTypePattern === KeyTypePatternEnum.SWITCHIR
  }
  get isInfraredScene () {
    return [`${KeyTypePatternEnum.SCENEIR}`, `${KeyTypePatternEnum.SWITCHSCENEIR}`].includes(this.keyTypePattern)
  }
  get isCurtain () {
    return this.keyTypePattern === KeyTypePatternEnum.SCENECURTAIN
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
    // 按键从右至左取值，构建字节码需先取反
    let keyDots = [...this.switchStatus.keyDots]
    keyDots = keyDots.reverse()
    if (this.isScene || this.isSwitchScene) { // 情景开关按字节 8位获取按键
      keyDots = keyDots.map(k => `${+k}`)
    }
    const extraDots = [...this.switchStatus.extraKeyDots].reverse()
    const status = new this.Converter(keyDots.join('') || '00', 2).toHex()
    const extraStatus = new this.Converter(extraDots.join('') || '00', 2).toHex()
    return this.bytes.format(status, extraStatus)
  }
}
