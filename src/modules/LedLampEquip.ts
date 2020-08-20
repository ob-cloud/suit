/*
 * @Author: eamiear
 * @Date: 2020-08-20 16:08:49
 * @Last Modified by: eamiear
 * @Last Modified time: 2020-08-20 17:46:56
 */

 import { LampEquip } from './LampEquip';
import { LampStatus } from '../entity/LampStatus'

export class LedLampEquip extends LampEquip {
  private bytes = `{0}{1}{2}0000000200`;
  lampStatus: LampStatus

  constructor(status: string, primaryType?: string, secondaryType?: string) {
    super(status, primaryType, secondaryType);
    this.lampStatus = new LampStatus(status)
  }
  /**
   * 是否双色灯
   */
  public isBicolor():boolean {
    return this.lampStatus.getColdColorStatus() !== '00';
  }
  /**
   * 是否单色灯
   */
  public isPlainColor():boolean {
    return !this.isBicolor();
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
    const converter = new (this.Converter as any)(+value + 154, 10)
    let status = value === 0 ? '00' : converter.toHex()
    this.lampStatus.setBrightnessStatus(status)
    return this;
  }
  /**
   * 获取亮度值
   */
  public getBrightness(): number {
    const bright = this.lampStatus.getBrightnessStatus() || 0
    const converter = new (this.Converter as any)(bright, 16)
    return bright ? converter.toDecimal() - 154 : 0
  }
  /**
   * 设置冷色温值
   * @param value 冷色值
   */
  public setColdColor(value: number): LedLampEquip {
    if (!value) {
      return this;
    }
    const colorValue = 255 - Math.round(value * 2.55)
    const converter = new (this.Converter as any)(colorValue, 10)
    this.lampStatus.setColdColorStatus(converter.toHex())
    return this;
  }
  /**
   * 获取冷色温
   */
  public getColdColor(): number {
    const colorValue = this.lampStatus.getColdColorStatus() || 0
    const converter = new (this.Converter as any)(colorValue, 16)
    return 100 - Math.round(converter.toDecimal() / 2.55)
  }
  /**
   * 设置暖色值
   */
  public setWarmColor(): LedLampEquip {
    this.lampStatus.setWarmColorStatus(this.isBicolor() ? 'ff' : '00')
    return this;
  }
  /**
   * 获取暖色温
   */
  public getWarmColor():string {
    return this.lampStatus.getWarmColorStatus();
  }
  /**
   * 获取设备字节状态字符串
   */
  public getBytes():string {
    const bright = this.lampStatus.getBrightnessStatus()
    const coldColor = this.lampStatus.getColdColorStatus()
    const warmColor = this.lampStatus.getWarmColorStatus()
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
  public getTurnOnBytes(bright?: number, cold?: number):string {
    return this.setBrightness(bright || 100)
      .setColdColor(cold || 0)
      .setWarmColor()
      .getBytes();
  }
}
