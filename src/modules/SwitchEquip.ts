/*
 * @Author: eamiear
 * @Date: 2020-08-29 20:16:40
 * @Last Modified by: eamiear
 * @Last Modified time: 2020-08-29 21:15:29
 */
import { BaseEquip } from './BaseEquip';

export class SwitchEquip extends BaseEquip {
  constructor(status: string, deviceType?: string, deviceChildType?: string) {
    super(status, deviceType, deviceChildType)
  }
  getBytes (status: Array<string>) {
  }
}
