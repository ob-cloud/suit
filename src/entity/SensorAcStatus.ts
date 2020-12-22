/*
 * @Author: eamiear
 * @Date: 2020-12-22 15:09:23
 * @Last Modified by: eamiear
 * @Last Modified time: 2020-12-22 15:11:20
 */
import { Status } from './Status';
/**
 * AC 人体红外传感器
 */
export class SensorAcStatus extends Status {
  public state: string = '';
  sense: string;
  constructor (status: string) {
    super(status)
    this.sense = status.slice(0, 2)
    this.state = status.slice(2, 4)
  }
  getStatus (): string {
    return this.state.toEvenHex()
  }
  setStatus (state: string): SensorAcStatus {
    this.state = state.toEvenHex()
    return this
  }
}
