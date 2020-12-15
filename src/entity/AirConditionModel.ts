/*
 * @Author: eamiear
 * @Date: 2020-08-21 17:04:00
 * @Last Modified by: eamiear
 * @Last Modified time: 2020-12-15 17:12:36
 */

import { Status } from "./Status"

 interface AC {
  keys: any[];
  serialId: string;
  deviceType: number;
  indexOsm: number;
  name: string;
  rmodel: string,
  keyValue: string
 }

//  import { Converter } from '../utils/converter';
export class AirConditionModel extends Status {
  keys: any[] = []
  serialId: string = ''
  deviceType!: number
  index!: number
  name: string = ''
  rmodel: string = ''
  keyValue: string = ''

  temperature: string = ''
  mode: string = ''
  speed: string = ''
  horizontalWing: string = ''
  verticalWing: string = ''
  power: string = ''

  constructor (status: string, ac?: AC) {
    super(status)
    this.mode = status.slice(0, 2)
    this.speed = status.slice(2, 4)
    this.temperature = status.slice(4, 6)
    this.verticalWing = status.slice(6, 8)
    this.horizontalWing = status.slice(8, 10)

    if (ac) {
      this.keys = ac.keys
      this.serialId = ac.serialId
      this.deviceType = ac.deviceType
      this.index = ac.indexOsm
      this.name = ac.name
      this.rmodel = ac.rmodel
      this.keyValue = ac.keyValue

      // this.init()
    }
  }
  init () {
    if (!this.keyValue ) return
    if (['on', 'off'].includes(this.keyValue)) {
      this.setPower(this.keyValue)
    } else {
      const keys = this.keyValue.split('_')
      if (keys.filter(i => i).length) this.setPower('on')
      keys[0] && this.setMode(keys[0])
      keys[1] && this.setSpeed(keys[1])
      this.setTemperature(keys[2] || '1a')
      keys[3] && this.setVerticalWing(keys[3])
      keys[4] && this.setHorizontalWing(keys[4])
    }
  }
  getKeys () {
    return this.keys
  }
  getKeyValue () {
    return this.keyValue
  }
  getSerialId () {
    return this.serialId
  }
  getDeviceType () {
    return this.deviceType
  }
  getIndex () {
    return this.index
  }
  getName () {
    return this.name
  }
  getrModel () {
    return this.rmodel
  }
  setTemperature (tmp: string): AirConditionModel {
    this.temperature = tmp
    return this
  }
  getTemperature (): string {
    return this.temperature
  }
  setMode (mode: string): AirConditionModel {
    this.mode = mode
    return this
  }
  getMode (): string {
    return this.mode
  }
  setSpeed (speed: string): AirConditionModel {
    this.speed = speed
    return this
  }
  getSpeed (): string {
    return this.speed
  }
  setHorizontalWing (wing: string): AirConditionModel {
    this.horizontalWing = wing
    return this
  }
  getHorizontalWing (): string {
    return this.horizontalWing
  }
  setVerticalWing (wing: string): AirConditionModel{
    this.verticalWing = wing
    return this
  }
  getVerticalWing (): string {
    return this.verticalWing
  }
  setPower (power: string): AirConditionModel {
    this.power = power
    return this
  }
  getPower (): string {
    return this.power
  }
}
