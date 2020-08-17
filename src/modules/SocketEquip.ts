import { BaseEquip } from './BaseEquip';

export class SocketEquip extends BaseEquip {
  public readonly deviceType: string = '';
  public readonly deviceSubType: string = '';
  public readonly status: string = '';
  constructor(deviceType: string, deviceSubType: string, status: string) {
    super();
    this.deviceType = deviceType;
    this.deviceSubType = deviceSubType;
    this.status = status;
  }
  public getDescriptor() {
    if (!this.deviceSubType) {
      return this.getMainDescriptor(this.deviceType, this.status);
    }
    return ''
  }
}
