import { Status } from './Status';
export class LampStatus extends Status {
  //  普通灯状态
  public readonly normalLampStatus: string = '';
  // 色灯状态
  public readonly colorLampStatus: string = '';

  // 亮度状态
  brightnessStatus: string = '';
  // 冷光
  coldColorStatus: string = '';
  // 暖光
  warmColorStatus: string = '';
  // 时延
  timeDelayStatus: string = ''

  constructor(status: string) {
    super(status);
    this.normalLampStatus = status.slice(0, 2);
    this.colorLampStatus = status.slice(2, 4);

    this.brightnessStatus = status.slice(0, 2)
    this.coldColorStatus = status.slice(2, 4)
    this.warmColorStatus = status.slice(4, 6)
    this.timeDelayStatus = status.slice(12, 14)
  }

  public getNormalLampStatus(): string {
    return this.normalLampStatus;
  }
  public getColorLampStatus(): string {
    return this.colorLampStatus;
  }

  setBrightnessStatus (bright: string): LampStatus {
    this.brightnessStatus = this.adaptHex(bright)
    return this
  }
  getBrightnessStatus (): string {
    return this.brightnessStatus
  }
  setColdColorStatus (color: string): LampStatus {
    this.coldColorStatus = this.adaptHex(color)
    return this
  }
  getColdColorStatus (): string{
    return this.coldColorStatus
  }
  setWarmColorStatus (warm: string): LampStatus {
    this.warmColorStatus = this.adaptHex(warm)
    return this
  }
  getWarmColorStatus (): string {
    return this.warmColorStatus
  }
  setTimeDelayStatus (timeDelay: string): LampStatus {
    this.timeDelayStatus = this.adaptHex(timeDelay)
    return this
  }
  getTimeDelayStatus (): string {
    return this.timeDelayStatus
  }
}
