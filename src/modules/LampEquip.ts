import { BaseEquip } from './BaseEquip';

export class LampEquip extends BaseEquip {
  // public readonly primaryType: string | undefined = '';
  // public readonly secondaryType: string | undefined = '';
  // public readonly status: string = '';
  constructor(status: string, primaryType?: string, secondaryType?: string) {
    super(status, primaryType, secondaryType);
    // this.primaryType = primaryType;
    // this.secondaryType = secondaryType;
    // this.status = status;
  }
}
