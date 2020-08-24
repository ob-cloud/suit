/*
 * @Author: eamiear
 * @Date: 2020-08-21 17:04:00
 * @Last Modified by: eamiear
 * @Last Modified time: 2020-08-24 10:18:27
 */

import { Status } from "./Status"

 interface AC {
  keys: any[];
  brandId: string;
  deviceType: number;
  index: number;
  name: string;
  rmodel: string
 }

export class AirConditionModel extends Status {
  keys: any[] = []
  brandId: string = ''
  deviceType!: number
  index!: number
  name: string = ''
  rmodel: string = ''

  temperature: string = ''
  mode: string = ''
  speed: string = ''
  horizontalWing: string = ''
  verticalWing: string = ''

  constructor (ac?: AC) {
    super('')
    if (ac) {
      this.keys = ac.keys
      this.brandId = ac.brandId
      this.deviceType = ac.deviceType
      this.index = ac.index
      this.name = ac.name
      this.rmodel = ac.rmodel
    }
  }
  getKeys () {
    return this.keys
  }
  getBrandId () {
    return this.brandId
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
    this.temperature = this.adaptHex(tmp)
    return this
  }
  getTemperature (): string {
    return this.temperature
  }
  setMode (mode: string): AirConditionModel {
    this.mode = this.adaptHex(mode)
    return this
  }
  getMode (): string {
    return this.mode
  }
  setSpeed (speed: string): AirConditionModel {
    this.speed = this.adaptHex(speed)
    return this
  }
  getSpeed (): string {
    return this.speed
  }
  setHorizontalWing (wing: string): AirConditionModel {
    this.horizontalWing = this.adaptHex(wing)
    return this
  }
  getHorizontalWing (): string {
    return this.horizontalWing
  }
  setVerticalWing (wing: string): AirConditionModel{
    this.verticalWing = this.adaptHex(wing)
    return this
  }
  getVerticalWing (): string {
    return this.verticalWing
  }

  hasHorizontalSwing (): boolean {
    if (!this.keys || this.keys.length) return false
    const index = this.keys.findIndex(item => {
      const key = item.key
      return key.includes('_') && (key.includes('l0') || key.includes('l1') && !key.includes('*'))
    })
    return index !== -1
  }
  hasVerticalSwing () {
    if (!this.keys || this.keys.length) return false
    const index = this.keys.findIndex(item => {
      const key = item.key
      return key.includes('_') && (key.includes('u0') || key.includes('u1')) && !key.includes('*')
    })
    return index !== -1
  }
}
