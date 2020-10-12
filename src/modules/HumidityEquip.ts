/*
 * @Author: eamiear
 * @Date: 2020-08-20 17:38:37
 * @Last Modified by: eamiear
 * @Last Modified time: 2020-08-29 22:53:59
 */

import { BaseEquip } from './BaseEquip';
import { HumiditySensorStatus } from '../entity/sensor/HumiditySensorStatus';

/**
 * 温湿度传感器
 *
 * @example
 *
 * import { HumidityEquip } from 'hardware-suit'
 * const humidity = new HumidityEquip(state)
 * console.log(`${humidity.getTemperature()}℃/${humidity.getHumidity()}%`)
 *
 */
export class HumidityEquip extends BaseEquip {
  public readonly humidityStatus: HumiditySensorStatus;
  // TODO
  private readonly bytes = `0000000000000000`;

  /**
   * 温湿度传感器
   * @param status        温湿度状态值，16进制
   * @param deviceType    设备类型
   * @param deviceChildType 设备子类型
   */
  constructor(status: string, deviceType?: string, deviceChildType?: string) {
    super(status, deviceType, deviceChildType);
    this.humidityStatus = new HumiditySensorStatus(status);
  }

  /**
   * 设置温度
   * @param tmp 温度值
   */
  public setTemperature(tmp: number): HumidityEquip {
    const converter = new this.Converter(`${tmp}`, 10);
    this.humidityStatus.setTemperatureStatus(converter.toHex());
    return this;
  }
  /**
   * 获取温度
   */
  public getTemperature(): number {
    const tmp = this.humidityStatus.getTemperatureStatus();
    const converter = new this.Converter(tmp, 16);
    return +converter.toDecimal() - 30
  }

  public setHumidity(hum: number): HumidityEquip {
    const converter = new this.Converter(`${hum}`, 10);
    this.humidityStatus.setHumidityStatus(converter.toHex());
    return this;
  }
  /**
   * 获取湿度
   */
  public getHumidity(): number {
    const hum = this.humidityStatus.getHumidityStatus();
    const converter = new this.Converter(hum, 16);
    return +converter.toDecimal();
  }
  // TODO
  public getBytes() {
    return this.bytes;
  }
}
