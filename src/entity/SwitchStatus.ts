/*
 * @Author: eamiear
 * @Date: 2020-08-29 17:46:03
 * @Last Modified by: eamiear
 * @Last Modified time: 2020-08-29 20:10:41
 */

import { Status } from './Status';
/**
 * TODO 开关
 */
export class SwitchStatus extends Status {
  public state: string = '';
  constructor (status: string) {
    super(status)
    this.state = status.slice(0, 2)
  }
  getState () {
    return this.state
  }
}
