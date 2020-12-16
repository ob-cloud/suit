/*
 * @Author: eamiear
 * @Date: 2020-08-21 16:59:16
 * @Last Modified by: eamiear
 * @Last Modified time: 2020-12-16 17:57:31
 */

import { BaseEquip } from './BaseEquip';
import { AirConditionModel } from '../entity/AirConditionModel';

// 模式
const ModeMap: any = {
  1: 'a',
  2: 'r',
  3: 'd',
  4: 'w',
  5: 'h'
}
/**
 * 模式描述表
 */
const ModeDescriptorMap: any = {
  1: '自动',
  2: '制冷',
  3: '抽湿',
  4: '送风',
  5: '制热'
}
// 风速
const SpeedMap: any = {
  0: 's0',
  1: 's1',
  2: 's2',
  3: 's3'
}
const SpeedDescriptorMap: any = {
  0: '自动',
  1: '弱',
  2: '中',
  3: '强'
}
// 左右摆风
const HorizontalWingMap: any = {
  0: 'l0', // 关闭
  1: 'l1'
}
// 上下摆风
const VerticalWingMap: any = {
  0: 'u0', // 关闭
  1: 'u1'
}
const WingDescriptorMap: any = {
  'l0': '',
  'l1': '左右',
  'u0': '',
  'u1': '上下'
}

export class AirConditionEquip extends BaseEquip {
  airModel: AirConditionModel;
  airEntity!: AirConditionModel;
  /** 模式_风速_温度_上下摆风_左右摆风_p0 */
  private readonly bytes = `{0}_{1}_{2}_{3}_{4}_p0`;

  /**
   * 空调套件操作
   * @param status          16进制状态字符串
   * @param deviceType      设备类型
   * @param deviceChildType 设备子类型
   * @param ac              空调对象信息
   */
  constructor (status: string = '', deviceType?: string, deviceChildType?: string, ac?: any) {
    super(status, deviceType, deviceChildType)
    /**
     * 空调实体对象
     */
    this.airModel = new AirConditionModel(status, ac)
    if (ac) this.airEntity = new AirConditionModel(status, ac)

    if (this.hasHorizontalSwing()) this.setHorizontalWing(0)
    if (this.hasVerticalSwing()) this.setVerticalWing(0)

    this.init()
  }
  static get defaultTemp () {
    return 26
  }
  init () {
    const keyValue = this.airModel.getKeyValue()
    if (!keyValue ) return
    if (['on', 'off'].includes(keyValue)) {
      // this.airModel.setPower(keyValue)
      this.setPower(keyValue === 'on')
      // keyValue === 'on' ? this.setPowerOn() : this.setPowerOff()
      // this.setTemperature(+this.getTemperature(new this.Converter(`${AirConditionEquip.defaultTemp}`, 10).toHex()))
    } else {
      const keys = keyValue.split('_')
      if (keys.filter(i => i).length) this.airModel.setPower('on')
      keys[0] && this.setMode(+this.getMode(keys[0]))
      keys[1] && this.setSpeed(+this.getSpeed(keys[1]))
      this.setTemperature(+this.getTemperature(new this.Converter(keys[2] ? keys[2] : `${AirConditionEquip.defaultTemp}`, 10).toHex()))
      keys[3] && this.setVerticalWing(+this.getVerticalWing(keys[3]))
      keys[4] && this.setHorizontalWing(+this.getHorizontalWing(keys[4]))
    }
  }
  /**
   * 是否红外
   */
  isInfrared () {
    return !this.status
  }
  /**
   * 获取空调实体对象信息
   * @param ac 空调对象详情
   */
  getEntity (ac: any) {
    this.airEntity = new AirConditionModel(ac)
    return this.airEntity
  }
  /**
   * 设置空调温度值
   * @param temp 十进制温度值
   */
  setTemperature (temp: number): AirConditionEquip {
    // if (temp === 0) {
    //   this.airModel.setTemperature(`${temp}`);
    //   return this
    // }
    const temperature = temp < 18 ? temp + 1 : temp > 30 ? temp - 1 : temp
    const tempHex = new this.Converter(`${temperature}`, 10).toHex()
    this.airModel.setTemperature(tempHex)
    return this
  }
  /**
   * 获取空调温度值
   */
  getTemperature (v?: string): string {
    const temp = v || this.airModel.getTemperature()
    const tmepDecimal = new this.Converter(temp, 16).toDecimal()
    return tmepDecimal
  }
  getTemperatureText (): string {
    const temp = this.getTemperature()
    // const tempTxt = temp === '00' ? '--' : temp
    return this.isPowerOn() ? `${temp}` : '--'
  }
  /**
   * 设置空调模式
   * @param mode 模式值（1 自动，2 制冷， 3 抽湿， 4 送风， 5 制热）
   */
  setMode (mode: number): AirConditionEquip {
    this.airModel.setMode(ModeMap[mode > 4 ? 1 : mode])
    // if ([2, 3].includes(mode)) this.setSpeed(0) // 自动
    // 制冷、抽湿， 自动风， 否则 弱风
    this.setSpeed([1, 2, 3].includes(mode) ? 0 : 1)
    // 自动、抽湿 无温度，否则默认温度
    // this.setTemperature([1, 3].includes(mode) ? 0 : AirConditionEquip.defaultTemp)
    if (![1, 3].includes(mode)) {
      this.setTemperature(AirConditionEquip.defaultTemp)
    }
    return this
  }
  /**
   * 获取空调模式键值: 0,1,2,3,4,5
   */
  getMode (v?: string): string {
    const mode = v || this.airModel.getMode()
    const modeKey = Object.keys(ModeMap).find(key => ModeMap[key] === mode)
    return modeKey || ''
  }
  /**
   * 获取空调模式值: a,r,d,w,h
   */
  getModeValue ():string {
    return this.airModel.getMode()
  }
  /**
   * 获取模式描述: 自动、制冷...
   */
  getModeText (): string {
    const mode = ModeDescriptorMap[this.getMode()] || ModeDescriptorMap[2]
    return this.isPowerOn() ? `${mode}` : '--'
  }
  /**
   * 设置风速
   * @param speed （0 自动， 1 弱， 2 中， 3 强）
   */
  setSpeed (speed: number): AirConditionEquip {
    this.airModel.setSpeed(SpeedMap[speed > 3 ? 0 : speed])
    return this
  }
  /**
   * 获取风速键值: 0, 1,2,3
   */
  getSpeed (v?: string): string {
    const speed = v || this.airModel.getSpeed()
    const speedKey = Object.keys(SpeedMap).find(key => SpeedMap[key] === speed)
    return speedKey || ''
  }
  /**
   * 获取风速值: s0,s1,s2,s3
   */
  getSpeedValue (): string {
    return this.airModel.getSpeed()
  }
  getSpeedText (): string {
    const speed = SpeedDescriptorMap[this.getSpeed()] || SpeedDescriptorMap[0]
    return this.isPowerOn() ? `${speed}` : '--'
  }
  /**
   * 设置左右摆风
   * @param wing 0~1
   */
  setHorizontalWing (wing: number = 0): AirConditionEquip {
    this.airModel.setHorizontalWing(HorizontalWingMap[wing > 1 ? 0 : wing])
    if (wing === 1) this.setVerticalWing(0)
    return this
  }
  /**
   * 获取左右摆风
   */
  getHorizontalWing (v?: string): string {
    const wing = v || this.airModel.getHorizontalWing()
    const wingKey = Object.keys(HorizontalWingMap).find(key => HorizontalWingMap[key] === wing)
    return wingKey || ''

  }
  getHorizontalWingValue (): string {
    return this.airModel.getHorizontalWing()
  }
  /**
   * 设置上下摆风
   * @param wing 0~1
   */
  setVerticalWing (wing: number = 0): AirConditionEquip {
    this.airModel.setVerticalWing(VerticalWingMap[wing > 1 ? 0 : wing])
    if (wing === 1) this.setHorizontalWing(0)
    return this
  }
  getVerticalWing (v?: string): string {
    const wing = v || this.airModel.getVerticalWing()
    const wingKey = Object.keys(VerticalWingMap).find(key => VerticalWingMap[key] === wing)
    return wingKey || ''
  }
  getVerticalWingVlaue (): string {
    return this.airModel.getVerticalWing()
  }
  getWingText (): string {
    const w = WingDescriptorMap[this.getHorizontalWingValue()] || WingDescriptorMap[this.getVerticalWingVlaue()] || '--'
    return this.isPowerOn() ? `${w}` : '--'
  }
  /**
   * 启动电源
   * @param temp 温度
   * @param speed 风速
   * @param mode 模式
   */
  setPowerOn (temp: number = 26, speed:number = 0, mode:number = 1): AirConditionEquip {
    this.airModel.setPower('on')
    this.setTemperature(temp).setSpeed(speed).setMode(mode)
    return this
  }
  /**
   * 关闭电源
   */
  setPowerOff (): AirConditionEquip {
    this.airModel.setPower('off')
    return this
  }
  setPower (power: boolean): AirConditionEquip {
    return power ? this.setPowerOn() : this.setPowerOff()
  }
  /**
   * 获取电源值
   */
  getPower (): string {
    return this.airModel.getPower()
  }
  getPowerStatus (): boolean {
    return this.isPowerOn()
  }
  /**
   * 电源是否开启
   */
  isPowerOn (): boolean {
    return this.getPower() === 'on'
  }
  /**
   * 温度是否可设置
   */
  isTemperatureValid (): boolean {
    return this.isPowerOn() && ['1', '4'].includes(this.getMode())
  }
  /**
   * 风速是否可设置
   */
  isFanSpeedValid (): boolean {
    return this.isPowerOn() && ['0', '1', '4'].includes(this.getMode())
  }
  isWingValid (): boolean {
    return this.isPowerOn() && ['0', '1', '4'].includes(this.getMode())
  }
  /**
   * 是否有左右摆风
   * @param keys 空调按键列表
   */
  hasHorizontalSwing (keys: any[] = []): boolean {
    // if (!this.airEntity && (!keys || !keys.length)) return false
    const wingKeys = this.airEntity ? this.airEntity.getKeys() : keys
    if (!wingKeys || !wingKeys.length) return false
    const index = Array.from(wingKeys).findIndex(item => {
      const key = item.key
      return key.includes('_') && ((key.includes('l0') || key.includes('l1')) && !key.includes('*'))
    })
    return index !== -1
  }
  /**
   * 是否有上下摆风
   * @param keys 空调按键列表
   */
  hasVerticalSwing (keys: any[] = []): boolean {
    // if (!this.airEntity && (!keys || !keys.length)) return false
    const wingKeys = this.airEntity ? this.airEntity.getKeys() : keys
    if (!wingKeys || !wingKeys.length) return false
    const index = Array.from(wingKeys).findIndex(item => {
      const key = item.key
      return key.includes('_') && ((key.includes('u0') || key.includes('u1')) && !key.includes('*'))
    })
    return index !== -1
  }
  /**
   * 获取电源字节字符串
   */
  getPowerBytes () {
    return this.getPower()
  }
  getBytes () {
    const mode = this.getModeValue()
    const speed = this.getSpeedValue()
    // const temperature = this.getTemperature() === '00' ? '' : this.getTemperature()
    const temperature = this.getTemperature()
    const vwing = this.getVerticalWingVlaue()
    const hwing = this.getHorizontalWingValue()
    return this.bytes.format(mode, speed, temperature, vwing, hwing);
  }
}
