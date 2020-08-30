import { Status } from './Status';
export class LampStatus extends Status {
  //  普通灯状态
  public readonly normalLampStatus: string = '';
  // 色灯状态
  public readonly colorLampStatus: string = '';

  // 亮度状态
  public brightnessStatus: string = '';
  // 冷光
  public coldColorStatus: string = '';
  // 暖光
  public warmColorStatus: string = '';
  // 时延
  public timeDelayStatus: string = '';

  public exceptionStatus: string = ''

  constructor(status: string) {
    super(status);
    this.normalLampStatus = status.slice(0, 2);
    this.colorLampStatus = status.slice(2, 4);

    this.brightnessStatus = status.slice(0, 2);
    this.coldColorStatus = status.slice(2, 4);
    this.warmColorStatus = status.slice(4, 6);
    this.timeDelayStatus = status.slice(12, 14);
    this.exceptionStatus = status.slice(14)
  }

  public getNormalLampStatus(): string {
    return this.normalLampStatus;
  }
  public getColorLampStatus(): string {
    return this.colorLampStatus;
  }

  public setBrightnessStatus(bright: string): LampStatus {
    this.brightnessStatus = bright.toEvenHex();
    return this;
  }
  public getBrightnessStatus(): string {
    return this.brightnessStatus;
  }
  public setColdColorStatus(color: string): LampStatus {
    this.coldColorStatus = color.toEvenHex();
    return this;
  }
  public getColdColorStatus(): string {
    return this.coldColorStatus;
  }
  public setWarmColorStatus(warm: string): LampStatus {
    this.warmColorStatus = warm.toEvenHex();
    return this;
  }
  public getWarmColorStatus(): string {
    return this.warmColorStatus;
  }
  public setTimeDelayStatus(timeDelay: string): LampStatus {
    this.timeDelayStatus = timeDelay.toEvenHex();
    return this;
  }
  public getTimeDelayStatus(): string {
    return this.timeDelayStatus;
  }
  public getExceptionStatus(): string {
    return this.exceptionStatus
  }
}
