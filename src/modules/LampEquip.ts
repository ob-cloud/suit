import { BaseEquip } from './BaseEquip'

export class LampEquip extends BaseEquip {
  primaryType: string = ''
  secondaryType: string = ''
  status: string = ''
  constructor (status: string, primaryType?: string, secondaryType?: string) {
    super()
    this.primaryType = primaryType
    this.secondaryType = secondaryType
    this.status = status
  }
}
