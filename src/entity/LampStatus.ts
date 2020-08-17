import { Status } from './Status'
export class LampStatus extends Status{
  normalLampStatus: string = ''
  colorLampStatus: string = ''

  constructor (status:string) {
    super(status)
    this.normalLampStatus = status.slice(0, 2)
    this.colorLampStatus = status.slice(2, 4)
  }

  getNormalLampStatus () {
    return this.normalLampStatus
  }
  getColorLampStatus () {
    return this.colorLampStatus
  }
}
