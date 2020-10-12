/*
 * @Author: eamiear
 * @Date: 2020-08-20 16:08:49
 * @Last Modified by: eamiear
 * @Last Modified time: 2020-10-12 17:49:19
 */

import { LampEquip } from './LampEquip';
import { LampStatus } from '../entity/LampStatus';

/**
 * LED 灯（单色灯、双色灯）
 *
 * **使用示例**
 *```js
 * const ledLampEquip = new LedLampEquip(status, deviceType, deviceChildType)
 * this.power = ledLampEquip.isPowerOn()
 *
 * const statusBytes = this.ledLampEquip.setBrightness(50).setColdColor(30).getBytes()
 * console.log(statusBytes)
 * ```
 */
export class LedLampEquip extends LampEquip {
  public readonly lampStatus: LampStatus;
  private readonly bytes = `{0}{1}{2}0000000200`;

  /**
   * LED 灯（单色灯、双色灯）
   * @param status        状态值，16进制
   * @param deviceType    设备类型
   * @param deviceChildType 设备子类型
   */
  constructor(status: string, deviceType?: string, deviceChildType?: string) {
    super(status, deviceType, deviceChildType);
    this.lampStatus = new LampStatus(status);
  }
  /**
   * 是否双色灯
   */
  public isBicolor(): boolean {
    // return this.lampStatus.getColdColorStatus() !== '00';
    return this.TypeHints.isBicolorLed(this.deviceChildType)
  }
  /**
   * 是否单色灯
   */
  public isPlainColor(): boolean {
    return !this.isBicolor();
  }
  /**
   * 电源是否启动
   */
  public isPowerOn(): boolean {
    return this.getBrightness() > 0
  }
  /**
   * 设置亮度值
   * @param value 亮度值（0~100）
   */
  public setBrightness(value: number): LedLampEquip {
    if (value < 0 || value > 100) {
      console.warn('value should be 0 ~ 100');
      return this;
    }
    const converter = new this.Converter(`${value + 154}`, 10);
    const status = value === 0 ? '00' : converter.toHex();
    this.lampStatus.setBrightnessStatus(status);
    return this;
  }
  /**
   * 获取亮度值
   */
  public getBrightness(): number {
    const bright = this.lampStatus.getBrightnessStatus() || 0;
    const converter = new this.Converter(`${bright}`, 16);
    return bright ? +converter.toDecimal() - 154 : 0;
  }
  /**
   * 设置冷色温值
   * @param value 冷色值
   */
  public setColdColor(value: number): LedLampEquip {
    if (value < 0 || value > 255) {
      console.warn('value should be 0 ~ 255');
      return this;
    }
    // const colorValue = 255 - Math.round(value * 2.55);
    const converter = new this.Converter(`${value}`, 10);
    this.lampStatus.setColdColorStatus(converter.toHex());
    return this;
  }
  /**
   * 获取冷色温
   */
  public getColdColor(): number {
    const colorValue = this.lampStatus.getColdColorStatus() || 0;
    const converter = new this.Converter(`${colorValue}`, 16);
    // return 100 - Math.round(+converter.toDecimal() / 2.55);
    return +converter.toDecimal()
  }
  /**
   * 设置暖色值
   */
  public setWarmColor(): LedLampEquip {
    this.lampStatus.setWarmColorStatus(this.isBicolor() ? 'ff' : '00');
    return this;
  }
  /**
   * 获取暖色温
   */
  public getWarmColor(): string {
    this.setWarmColor()
    return this.lampStatus.getWarmColorStatus();
  }
  /**
   * 获取设备字节状态字符串
   */
  public getBytes(): string {
    const bright = this.lampStatus.getBrightnessStatus();
    const coldColor = this.lampStatus.getColdColorStatus();
    const warmColor = this.lampStatus.getWarmColorStatus();
    return this.bytes.format(bright, coldColor, warmColor);
  }

  /**
   * 获取关灯字节状态字符串
   */
  public getTurnOffBytes(): string {
    return this.setBrightness(0)
      .setColdColor(0)
      .setWarmColor()
      .getBytes();
  }
  /**
   * 获取关灯字节状态字符串
   * @param bright 亮度
   * @param cold 冷色值
   */
  public getTurnOnBytes(bright?: number, cold?: number): string {
    return this.setBrightness(bright || 100)
      .setColdColor(cold || 0)
      .setWarmColor()
      .getBytes();
  }

  /**
   * 获取灯异常状态
   */
  public getLampExceptionStatus(): string {
    // 01,02,03 十六机制
    // 00000001 00000010 00000011
    const bytes = this.lampStatus.getExceptionStatus()
    // const bits = exception.split('')
    if (!bytes || !bytes.length) return '无异常'
    // return bits[0] === '1' ? '开路' : bits[1] === '1' ? '短路' : '无异常'
    const bytesMap: any = {
      '01': '开路',
      '02': '短路',
      '03': '异常'
    }
    return bytesMap[bytes] || '无异常'
  }
}
