import { Status } from './Status';
export class LampStatus extends Status {
  public readonly normalLampStatus: string = '';
  public readonly colorLampStatus: string = '';

  constructor(status: string) {
    super(status);
    this.normalLampStatus = status.slice(0, 2);
    this.colorLampStatus = status.slice(2, 4);
  }

  public getNormalLampStatus() {
    return this.normalLampStatus;
  }
  public getColorLampStatus() {
    return this.colorLampStatus;
  }
}
