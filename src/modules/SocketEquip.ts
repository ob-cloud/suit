import { BaseDescriptor } from './BaseDescriptor'

class SocketEquip extends BaseDescriptor{
  deviceType: string = ''
  deviceSubType: string = ''
  status: string = ''
  constructor (deviceType: string, deviceSubType:string, status:string) {
    super()
    this.deviceType = deviceType
    this.deviceSubType = deviceSubType
    this.status = status
  }
  getDescriptor () {
    if (!this.deviceSubType) return this.getMainDescriptor(this.deviceType, this.status)
  }
}
