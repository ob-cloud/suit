/*
 * @Author: eamiear
 * @Date: 2020-08-29 17:46:03
 * @Last Modified by: eamiear
 * @Last Modified time: 2020-12-17 15:44:05
 */

import { SwitchStatus } from './SwitchStatus';
/**
 * 情景 + 开关
 */
export class SwitchSceneStatus extends SwitchStatus {
  public state: string = '';
  normalState: string;
  // normalKeyDots: string[];
  constructor (status: string, count?: Array<number>, typeIndex?: string) {
    super(status, count, typeIndex)
    this.normalState = status.slice(2, 4)
    // this.normalKeyDots = this.__parseKeyDots(this.normalState)
  }

  setDots () {

  }
  getState () {
    return this.state
  }
}
