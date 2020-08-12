import { BaseEquip } from './BaseEquip';

export class LampEquip extends BaseEquip {
  public readonly primaryType: string = '';
  public readonly secondaryType: string = '';
  public readonly status: string = '';
  constructor(status: string, primaryType?: string, secondaryType?: string) {
    super();
    this.primaryType = primaryType;
    this.secondaryType = secondaryType;
    this.status = status;
  }
}
