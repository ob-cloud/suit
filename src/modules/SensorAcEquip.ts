
import { BaseEquip } from './BaseEquip';
import { SensorAcStatus } from '../entity/SensorAcStatus';

 /**
  * 操作枚举
  */
 enum SensorAcStatusEnum {
  NONE = 0,
  PEOPLE = 1,
}

const SensorAcStatusMap:any = {
  [SensorAcStatusEnum.NONE]: '无人',
  [SensorAcStatusEnum.PEOPLE]: '有人',
}

/**
 * AC人体红外
 *
 * 使用示例：
 * ```js
 * const SensorAcEquip = new SensorAcEquip(status, deviceType, deviceChildType)
 *
 * const statusBytes = SensorAcEquip.getStatusDescriptor()
 *
 * ```
 */

export class SensorAcEquip extends BaseEquip {
  public readonly SensorAcStatus: SensorAcStatus;
  private readonly bytes = `00{0}000000000000`;

  /**
   * AC人体红外
   * @param status        状态值，16进制
   * @param deviceType    设备类型
   * @param deviceChildType 设备子类型
   */
  constructor(status: string, deviceType?: string, deviceChildType?: string) {
    super(status, deviceType, deviceChildType);
    this.SensorAcStatus = new SensorAcStatus(status);
  }

  get curStatus () {
    return this.SensorAcStatus.getStatus()
  }

  get curStatusInt () {
    return +new this.Converter(this.curStatus, 16).toDecimal() ? 1 : 0
  }

  /**
   * 获取窗帘状态
   */
  getStatusDescriptor () {
    return SensorAcStatusMap[this.curStatusInt] || ''
  }
  /**
   * 获取状态字节串
   */
  public getBytes(): string {
    return this.bytes.format(this.SensorAcStatus.getStatus())
  }
}
