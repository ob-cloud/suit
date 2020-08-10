import { BaseEquip } from './BaseEquip'

class LedEquip extends BaseEquip {
  primaryType: string = ''
  secondaryType: string = ''
  status: string = ''
  codeBit: string = ''
  constructor (primaryType: string, secondaryType: string, status: string) {
    super()
    this.primaryType = primaryType
    this.secondaryType = secondaryType
    this.status = status
    this.codeBit = status.slice(0, 2)
  }
  getSimpleStatusDescriptor (status) {

  }
  getColorLampStatusDescriptor (status) {

  }
}
