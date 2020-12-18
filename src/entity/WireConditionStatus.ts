/*
 * @Author: eamiear
 * @Date: 2020-08-21 17:04:00
 * @Last Modified by: eamiear
 * @Last Modified time: 2020-12-18 18:04:29
 */

import { Status } from "./Status"

//  import { Converter } from '../utils/converter';
export class WireAirConditionModel extends Status {
  temperature: string = '' // 设置温度
  mode: string = '' // 模式
  speed: string = '' // 风速
  horizontalWing: string = '' // 左右摆风
  verticalWing: string = '' // 上下摆风
  power: string = ''  // 电源
  preserve: string  // 预留
  roomTemp: string  // 室温

  constructor (status: string) {
    super(status)
    this.preserve = status.slice(0, 2)
    this.mode = status.slice(2, 4)
    this.power = status.slice(2, 4)
    this.speed = status.slice(4, 6)
    this.temperature = status.slice(6, 8)
    this.verticalWing = status.slice(8, 10)
    this.horizontalWing = status.slice(10, 12)
    this.roomTemp = status.slice(12, 14) || '32'
  }

  setTemperature (tmp: string): WireAirConditionModel {
    this.temperature = tmp
    return this
  }
  getTemperature (): string {
    return this.temperature
  }
  setMode (mode: string): WireAirConditionModel {
    this.mode = mode
    return this
  }
  getMode (): string {
    return this.mode
  }
  setSpeed (speed: string): WireAirConditionModel {
    this.speed = speed
    return this
  }
  getSpeed (): string {
    return this.speed
  }
  setHorizontalWing (wing: string): WireAirConditionModel {
    this.horizontalWing = wing
    return this
  }
  getHorizontalWing (): string {
    return this.horizontalWing
  }
  setVerticalWing (wing: string): WireAirConditionModel{
    this.verticalWing = wing
    return this
  }
  getVerticalWing (): string {
    return this.verticalWing
  }
  setPower (power: string): WireAirConditionModel {
    this.power = power
    return this
  }
  getPower (): string {
    return this.power
  }
}
