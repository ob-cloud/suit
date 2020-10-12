import { BaseEquip } from './BaseEquip';

export class LampEquip extends BaseEquip {
  constructor(status: string, primaryType?: string, secondaryType?: string) {
    super(status, primaryType, secondaryType);
  }
}
