import { BaseEquip } from './BaseEquip';
import {
  WireHWing,
  WireHWingDescriptorMap,
  WireHWingMap,
  WireMode,
  WireModeDescriptorMap,
  WireModeMap,
  WireSpeed,
  WireSpeedDescriptorMap,
  WireSpeedMap,
  WireVWing,
  WireVWingDescriptorMap,
  WWireVWingMap
} from '../shared/constant';
import { WireAirConditionModel } from '../entity/WireConditionStatus';
import { ConditionTempEnum } from './AirConditionEquip';

export class WireConditionEquip extends BaseEquip {
  airModel: WireAirConditionModel;
  /** 预留_模式_风速_温度_上下摆风_左右摆风_室温 */
  // 预留先移除
  private readonly bytes = `{0}{1}{2}{3}{4}{5}`;

  /**
   * 线控空调
   * @param status          16进制状态字符串
   * @param deviceType      设备类型
   * @param deviceChildType 设备子类型
   */
  constructor(status: string = '', deviceType ? : string, deviceChildType ? : string) {
    super(status, deviceType, deviceChildType)
    this.status = `00${status}`
    this.airModel = new WireAirConditionModel(this.status)
  }
  static get defaultTemp() {
    return ConditionTempEnum.default
  }
  /**
   * 设置空调温度值
   * @param temp 十进制温度值
   */
  setTemperature(temp: number): WireConditionEquip {
    const temperature = temp < ConditionTempEnum.min ? temp + 1 : temp > ConditionTempEnum.max ? temp - 1 : temp
    const tempHex = new this.Converter(`${temperature}`, 10).toHex()
    this.airModel.setTemperature(tempHex)
    return this
  }
  /**
   * 获取空调温度值
   */
  getTemperature(v ? : string): string {
    const temp = v || this.airModel.getTemperature()
    const tmepDecimal = new this.Converter(temp, 16).toDecimal()
    return tmepDecimal
  }
  /**
   * 获取温度存储值（hex）
   */
  getTemperatureRawValue(): string {
    return this.airModel.getTemperature()
  }
  /**
   * 获取温度文本
   */
  get temperatureText(): string {
    const temp = this.getTemperature()
    return this.isPowerOn ? `${temp}` : '--'
  }

  /**
   * 设置空调模式
   *
   * @param mode 模式值（2 制冷， 3 制热）
   */
  setMode(mode: number): WireConditionEquip {
    mode = mode > 3 ? 2 : mode
    this.airModel.setMode(WireModeMap[mode])
    this.setSpeed(WireSpeed.AUTO)
    this.setTemperature(WireConditionEquip.defaultTemp)
    return this
  }
  /**
   * 获取空调模式键值: 0,1,2,3
   */
  getMode(v ? : string): string {
    const mode = v || this.airModel.getMode()
    const modeKey = Object.keys(WireModeMap).find(key => WireModeMap[key] === mode)
    return modeKey || ''
  }
  /**
   * 获取空调模式值: 21， 51
   */
  getModeRawValue(): string {
    return this.airModel.getMode()
  }
  /**
   * 获取模式描述: 自动、制冷...
   */
  get modeText(): string {
    const mode = [WireMode.ON, WireMode.OFF].includes(+this.getMode()) ? WireMode.COLD : this.getMode()
    return this.isPowerOn ? `${WireModeDescriptorMap[mode]}` : '--'
  }
  /**
   * 设置风速
   * @param speed （0 自动， 1 弱， 2 中， 3 强）
   */
  setSpeed(speed: number): WireConditionEquip {
    this.airModel.setSpeed(WireSpeedMap[speed > 3 ? 0 : speed])
    return this
  }
  /**
   * 获取风速键值: 0, 1,2,3
   */
  getSpeed(v ? : string): string {
    const speed = v || this.airModel.getSpeed()
    const speedKey = Object.keys(WireSpeedMap).find(key => WireSpeedMap[key] === speed)
    return speedKey || ''
  }
  /**
   * 获取风速值: 00, 01, 02, 03
   */
  getSpeedRawValue(): string {
    return this.airModel.getSpeed()
  }
  get speedText(): string {
    const speed = WireSpeedDescriptorMap[this.getSpeed()] || WireSpeedDescriptorMap[WireSpeed.AUTO]
    return this.isPowerOn ? `${speed}` : '--'
  }
  /**
   * 设置左右摆风
   * @param wing 0~1
   */
  setHorizontalWing(wing: number = 0): WireConditionEquip {
    this.airModel.setHorizontalWing(WireHWingMap[wing > 1 ? 0 : wing])
    if (wing === 1) this.setVerticalWing(0)
    return this
  }
  /**
   * 获取左右摆风 key 0， 1
   */
  getHorizontalWing(v ? : string): string {
    const wing = v || this.airModel.getHorizontalWing()
    const wingKey = Object.keys(WireHWingMap).find(key => WireHWingMap[key] === wing)
    return wingKey || ''
  }
  /**
   * 获取左右摆风值 00， 01
   */
  getHorizontalWingRawValue(): string {
    return this.airModel.getHorizontalWing()
  }
  /**
   * 获取左右摆风文本: '左右', '--'
   */
  get horizontalWingText(): string {
    const w = WireHWingDescriptorMap[this.getHorizontalWing()] || WireHWingDescriptorMap[WireHWing.OFF]
    return this.isPowerOn ? `${w}` : ''
  }
  /**
   * 设置上下摆风
   * @param wing 0~1
   */
  setVerticalWing(wing: number = 0): WireConditionEquip {
    this.airModel.setVerticalWing(WWireVWingMap[wing > 1 ? 0 : wing])
    if (wing === 1) this.setHorizontalWing(0)
    return this
  }
  /**
   * 获取摆风 key 0， 1
   */
  getVerticalWing(v ? : string): string {
    const wing = v || this.airModel.getVerticalWing()
    const wingKey = Object.keys(WWireVWingMap).find(key => WWireVWingMap[key] === wing)
    return wingKey || ''
  }
  /**
   * 获取摆风值 00， 01
   */
  getVerticalWingRawValue(): string {
    return this.airModel.getVerticalWing()
  }
  /**
   * 获取摆风文本: '左右', '--'
   */
  get verticalWingText(): string {
    const w = WireVWingDescriptorMap[this.getVerticalWing()] || WireVWingDescriptorMap[WireVWing.OFF]
    return this.isPowerOn ? `${w}` : ''
  }

  /**
   * 启动电源
   * @param temp 温度
   * @param speed 风速
   * @param mode 模式
   */
  setPowerOn(temp: number = 26, speed: number = 0): WireConditionEquip {
    this.airModel.setPower(WireModeMap[WireMode.ON])
    this.setTemperature(temp).setSpeed(speed).setHorizontalWing(WireHWing.OFF).setVerticalWing(WireVWing.OFF)
    return this
  }
  /**
   * 关闭电源
   */
  setPowerOff(): WireConditionEquip {
    this.airModel.setPower(WireModeMap[WireMode.OFF])
    this.setTemperature(WireConditionEquip.defaultTemp).setSpeed(WireSpeed.AUTO).setHorizontalWing(WireHWing.OFF).setVerticalWing(WireVWing.OFF)
    return this
  }
  setPower(power: boolean): WireConditionEquip {
    return power ? this.setPowerOn() : this.setPowerOff()
  }
  /**
   * 获取电源值
   */
  getPower(): string {
    return this.airModel.getPower()
  }
  /**
   * 获取电源当前状态
   */
  getPowerStatus (): boolean {
    return this.isPowerOn
  }
  /**
   * 电源是否开启
   */
  get isPowerOn(): boolean {
    return this.getPower() === WireModeMap[WireMode.ON] || !!+this.getModeRawValue()
  }
  /**
   * 温度是否可设置
   */
  get isTemperatureValid(): boolean {
    return this.isPowerOn
  }
  /**
   * 风速是否可设置
   */
  get isFanSpeedValid(): boolean {
    return this.isPowerOn
  }
  get isWingValid(): boolean {
    return this.isPowerOn
  }
  get hasWing (): boolean {
    return true
  }
  /**
   * 获取电源字节字符串
   */
  getPowerBytes() {
    const mode = this.getPower()
    const speed = this.getSpeedRawValue()
    const temperature = this.getTemperatureRawValue()
    const vwing = this.getVerticalWingRawValue()
    const hwing = this.getHorizontalWingRawValue()
    return this.bytes.format(mode, speed, temperature, vwing, hwing, this.airModel.roomTemp);
  }
  getBytes() {
    const mode = this.getModeRawValue()
    const speed = this.getSpeedRawValue()
    const temperature = this.getTemperatureRawValue()
    const vwing = this.getVerticalWingRawValue()
    const hwing = this.getHorizontalWingRawValue()
    return this.bytes.format(mode, speed, temperature, vwing, hwing, this.airModel.roomTemp);
  }

  getStatusDescriptor () {
    // return this.isPowerOn ? WireModeDescriptorMap[WireMode.ON] : WireModeDescriptorMap[WireMode.OFF]
    if (this.isPowerOn) {
      const modeValue = this.getModeRawValue()
      if (!modeValue) return WireModeDescriptorMap[WireMode.ON]
      if (WireModeMap[WireMode.COLD] === modeValue) return WireModeDescriptorMap[WireMode.COLD]
      if (WireModeMap[WireMode.HOT] === modeValue) return WireModeDescriptorMap[WireMode.HOT]
    }
    return WireModeDescriptorMap[WireMode.OFF]
  }
}
