import { BaseEquip } from './BaseEquip';

export class LampEquip extends BaseEquip {
  public primaryType: string | undefined = '';
  public secondaryType: string | undefined = '';
  public status: string = '';
  constructor(status: string, primaryType?: string, secondaryType?: string) {
    super();
    this.primaryType = primaryType;
    this.secondaryType = secondaryType;
    this.status = status;
  }
}
