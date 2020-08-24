/*
 * @Author: eamiear
 * @Date: 2020-08-21 16:59:16
 * @Last Modified by: eamiear
 * @Last Modified time: 2020-08-24 10:51:52
 */

import { BaseEquip } from './BaseEquip';
import { AirConditionModel } from '../entity/AirConditionModel';

const ModeMap: any = {
  'm1': 'a',
  'm2': 'r',
  'm3': 'd',
  'm4': 'w',
  'm5': 'h'
}
const SpeedMap: any = {
  's0': 's0',
  's1': 's1',
  's2': 's2',
  's3': 's3'
}
const HorizontalWingMap: any = {
  'h0': 'u0',
  'h1': 'u1'
}
const VerticalWingMap: any = {
  'v0': 'l0',
  'v1': 'l1'
}

export class AirConditionEquip extends BaseEquip {
  airModel: AirConditionModel;
  airEntity!: AirConditionModel;
  constructor (status: string, deviceType?: string, deviceChildType?: string, ac?: any) {
    super(status, deviceType, deviceChildType)
    this.airModel = new AirConditionModel()
    if (ac) this.airEntity = new AirConditionModel(ac)
  }
  getEntity (ac: any) {
    this.airEntity = new AirConditionModel(ac)
    return this.airEntity
  }
  setTemperature (temp: number): AirConditionEquip {
    const tempHex = new this.Converter(`${temp}`, 10).toHex()
    this.airModel.setTemperature(tempHex)
    return this
  }
  getTemperature (): number {
    const temp = this.airModel.getTemperature()
    const tmepDecimal = new this.Converter(temp, 16).toDecimal()
    return +tmepDecimal
  }
  setMode (mode: string): AirConditionEquip {
    this.airModel.setMode(ModeMap[mode])
    return this
  }
  getMode (): string {
    const mode = this.airModel.getMode()
    const modeKey = Object.keys(ModeMap).find(key => ModeMap[key] === mode)
    return modeKey || ''
  }
  setSpeed (speed: string): AirConditionEquip {
    this.airModel.setSpeed(SpeedMap[speed])
    return this
  }
  getSpeed (): string {
    const speed = this.airModel.getSpeed()
    const speedKey = Object.keys(SpeedMap).find(key => SpeedMap[key] === speed)
    return speedKey || ''
  }
  setHorizontalWing (wing: string): AirConditionEquip {
    this.airModel.setHorizontalWing(HorizontalWingMap[wing])
    return this
  }
  getHorizontalWing (): string {
    const wing = this.airModel.getHorizontalWing()
    const wingKey = Object.keys(HorizontalWingMap).find(key => HorizontalWingMap[key] === wing)
    return wingKey || ''
  }
  setVerticalWing (wing: string) : AirConditionEquip {
    this.airModel.setVerticalWing(VerticalWingMap[wing])
    return this
  }
  getVerticalWing (): string {
    const wing = this.airModel.getVerticalWing()
    const wingKey = Object.keys(VerticalWingMap).find(key => VerticalWingMap[key] === wing)
    return wingKey || ''
  }
  /**
   * 是否有左右摆风
   * @param keys 空调按键列表
   */
  hasHorizontalSwing (keys: any[]): boolean {
    if (!this.airEntity && (!keys || !keys.length)) return false
    const wingKeys = this.airEntity ? this.airEntity.getKeys() : keys
    const index = wingKeys.findIndex(item => {
      const key = item.key
      return key.includes('_') && (key.includes('l0') || key.includes('l1') && !key.includes('*'))
    })
    return index !== -1
  }
  /**
   * 是否有上下摆风
   * @param keys 空调按键列表
   */
  hasVerticalSwing (keys: any[]): boolean {
    if (!this.airEntity && (!keys || !keys.length)) return false
    const wingKeys = this.airEntity ? this.airEntity.getKeys() : keys
    const index = wingKeys.findIndex(item => {
      const key = item.key
      return key.includes('_') && (key.includes('u0') || key.includes('u1')) && !key.includes('*')
    })
    return index !== -1
  }
}
