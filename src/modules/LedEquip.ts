import { BaseDescriptor } from './BaseDescriptor'

class LedEquip extends BaseDescriptor {
  deviceType: string = ''
  deviceSubType: string = ''
  status: string = ''
  codeBit: string = ''
  constructor (deviceType: string, deviceSubType: string, status: string) {
    super()
    this.deviceType = deviceType
    this.deviceSubType = deviceSubType
    this.status = status
    this.codeBit = status.slice(0, 2)
  }
  getSimpleStatusDescriptor (status) {

  }
  getColorLampStatusDescriptor (status) {

  }
}
