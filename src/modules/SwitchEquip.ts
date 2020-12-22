/*
 * @Author: eamiear
 * @Date: 2020-08-29 20:16:40
 * @Last Modified by: eamiear
 * @Last Modified time: 2020-12-22 11:37:49
 */
import { BaseEquip } from './BaseEquip';
import { SwitchMixEquip } from './SwitchMixEquip';
import { SwitchPlugEquip } from './SwitchPlugEquip';

export class SwitchEquip extends BaseEquip {
  switchStatus: any;
  equip: any = {};
  flag: any;
  /**
   * 开关工厂函数
   * @param status 状态字符串
   * @param deviceType 设备主类型
   * @param deviceChildType 设备子类型
   *
   * @example
   *
   * const factory = new SwitchEquip(status, device, deviceChildType)
   * const equip = factory.create()
   * const power = euip.getPowerInt()
   * equip.setPower(1, 0)
   * const status = equip.getBytes()
   * const statusDescriptor = equip.getStatusDescriptor()
   */
  constructor(status: string, deviceType?: string, deviceChildType?: string, flag?: any) {
    super(status, deviceType, deviceChildType)
    this.flag = flag
  }
  create () {
    let equip = new SwitchMixEquip(this.status, this.deviceType, this.deviceChildType, this.flag)
    if (equip.isSocket) {
      equip = new SwitchPlugEquip(this.status, this.deviceType, this.deviceChildType)
    }
    return this.equip = equip
  }
  // setPower(v: number, index: number, t ? : number) {
  //   return this.equip.setPower(v, index, t)
  // }
  // getPower(index ? : number, t ? : number): Array < string > {
  //   return this.equip.getPower(index, t)
  // }
  // getPowerInt(index ? : number, t ? : number): Array < number > {
  //   return this.equip.getPowerInt(index, t)
  // }
  // getStatusDescriptor () {
  //   return this.equip.getStatusDescriptor()
  // }
  // getBytes () {
  //   return this.equip.getBytes()
  // }
}
