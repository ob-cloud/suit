import { Status } from './Status';
/**
 * 窗帘
 */
export class CurtainStatus extends Status {
  public state: string = '';
  constructor (status: string) {
    super(status)
    this.state = status.slice(0, 2)
  }
  getStatus () {
    return this.state.toEvenHex()
  }
  setStatus (state: string) {
    this.state = state.toEvenHex()
    return this
  }
}
