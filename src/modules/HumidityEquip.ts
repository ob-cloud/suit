/*
 * @Author: eamiear
 * @Date: 2020-08-20 17:38:37
 * @Last Modified by: eamiear
 * @Last Modified time: 2020-08-20 17:56:10
 */

import { BaseEquip } from './BaseEquip';
import { HumiditySensorStatus } from '../entity/sensor/HumiditySensorStatus'

class HumidityEquip extends BaseEquip {

  // TODO
  private bytes = `0000000000000000`;
  humidityStatus: HumiditySensorStatus

  constructor(status: string, primaryType?: string, secondaryType?: string) {
    super(status, primaryType, secondaryType);
    this.humidityStatus = new HumiditySensorStatus(status)
  }

  setTemperature (tmp: number): HumidityEquip {
    const converter = new (this.Converter as any)(tmp, 10)
    this.humidityStatus.setTemperatureStatus(converter.toHex())
    return this
  }
  getTemperature (): string {
    const tmp = this.humidityStatus.getTemperatureStatus()
    const converter = new (this.Converter as any)(tmp, 16)
    return converter.toDecimal()
  }

  setHumidity (hum: number): HumidityEquip {
    const converter = new (this.Converter as any)(hum, 10)
    this.humidityStatus.setHumidityStatus(converter.toHex())
    return this
  }
  getHumidity (): string {
    const hum = this.humidityStatus.getHumidityStatus()
    const converter = new (this.Converter as any)(hum, 16)
    return converter.toDecimal()
  }
  // TODO
  getBytes () {
    return this.bytes
  }
}
