/*
 * @Author: eamiear
 * @Date: 2020-08-21 16:59:16
 * @Last Modified by: eamiear
 * @Last Modified time: 2020-08-21 17:03:49
 */

import { BaseEquip } from './BaseEquip';

export class AirConditionEquip extends BaseEquip {
  constructor (status: string, deviceType?: string, deviceChildType?: string) {
    super(status, deviceType, deviceChildType)
  }
}
