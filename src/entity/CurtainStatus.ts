/*
 * @Author: eamiear
 * @Date: 2020-10-12 17:25:18
 * @Last Modified by: eamiear
 * @Last Modified time: 2020-12-18 11:03:16
 */
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
  getStatus (): string {
    return this.state.toEvenHex()
  }
  setStatus (state: string): CurtainStatus {
    this.state = state.toEvenHex()
    return this
  }
}
