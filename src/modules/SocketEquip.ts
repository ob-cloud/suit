import { BaseEquip } from './BaseEquip';

export class SocketEquip extends BaseEquip {
  constructor(deviceType: string, deviceChildType: string, status: string) {
    super(status, deviceType, deviceChildType);
  }
}
