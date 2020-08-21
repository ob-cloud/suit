/*
 * @Author: eamiear
 * @Date: 2020-08-20 17:38:37
 * @Last Modified by: eamiear
 * @Last Modified time: 2020-08-20 17:57:31
 */

import { BaseEquip } from './BaseEquip';
import { HumiditySensorStatus } from '../entity/sensor/HumiditySensorStatus';

/**
 * 温湿度传感器
 */
export class HumidityEquip extends BaseEquip {
  public readonly humidityStatus: HumiditySensorStatus;
  // TODO
  private readonly bytes = `0000000000000000`;

  constructor(status: string, primaryType?: string, secondaryType?: string) {
    super(status, primaryType, secondaryType);
    this.humidityStatus = new HumiditySensorStatus(status);
  }

  public setTemperature(tmp: number): HumidityEquip {
    const converter = new (this.Converter as any)(tmp, 10);
    this.humidityStatus.setTemperatureStatus(converter.toHex());
    return this;
  }
  public getTemperature(): string {
    const tmp = this.humidityStatus.getTemperatureStatus();
    const converter = new (this.Converter as any)(tmp, 16);
    return converter.toDecimal();
  }

  public setHumidity(hum: number): HumidityEquip {
    const converter = new (this.Converter as any)(hum, 10);
    this.humidityStatus.setHumidityStatus(converter.toHex());
    return this;
  }
  public getHumidity(): string {
    const hum = this.humidityStatus.getHumidityStatus();
    const converter = new (this.Converter as any)(hum, 16);
    return converter.toDecimal();
  }
  // TODO
  public getBytes() {
    return this.bytes;
  }
}
