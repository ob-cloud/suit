/*
 * @Author: eamiear
 * @Date: 2020-08-29 20:16:40
 * @Last Modified by: eamiear
 * @Last Modified time: 2020-12-16 18:26:16
 */
import { SwitchStatus } from '../entity/SwitchStatus';
import { BaseEquip } from './BaseEquip';

enum SwitchKeyStatus {
  ON = 1,
  OFF = 0
}

const SwitchKeyStatusMap: any = {
  [SwitchKeyStatus.ON]: '开',
  [SwitchKeyStatus.OFF]: '关'
}

export class SwitchEquip extends BaseEquip {
  switchStatus: SwitchStatus;
  keyList: any;
  private readonly bytes = `{0}00000000000000`;
  constructor(status: string, deviceType?: string, deviceChildType?: string) {
    super(status, deviceType, deviceChildType)
    this.keyList = this.TypeHints.getSocketSwitchTypeIndex(deviceType, deviceChildType)
    this.switchStatus = new SwitchStatus(status, +this.getKeyCount())
  }
  get keyDots () {
    // ['00', '01', '10', '11']
    return this.switchStatus.keyDots
  }
  get keyCount () {
    return +this.getKeyCount()
  }
  getKeyCount () {
    if (!this.keyList || !this.keyList.length) return 1
    let keys = this.keyList.split('|')
    keys = keys.filter((it: any) => it)
    return keys.reduce((a:any, b:any) => +a + (+b)) || 1
  }
  setPower (v: number, index: number) {
    const vb = new this.Converter(`${v}`, 10).toBinary()
    this.switchStatus.setKeyDot(vb, index)
  }

  getBytes () {
    const keyDots = this.switchStatus.keyDots
    const status = new this.Converter(keyDots.join(''), 2).toHex()
    return this.bytes.format(status)
  }
}
