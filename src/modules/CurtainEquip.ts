
import { BaseEquip } from './BaseEquip';
import { CurtainStatus } from '../entity/CurtainStatus';

 /**
  * 操作枚举
  */
 enum Operation {
  STOP = 0,
  PAUSE = 1,
  OPEN = 2,
}

/**
 * 窗帘套件
 *
 * 使用示例：
 * ```js
 * const curtainEquip = new CurtainEquip(status, deviceType, deviceChildType)
 *
 * const statusBytes = curtainEquip.open().getBytes()
 * console.log(statusBytes)
 *
 * ```
 */

export class CurtainEquip extends BaseEquip {
  public readonly curtainStatus: CurtainStatus;
  private readonly bytes = `{0}00000000000000`;

  /**
   * 窗帘套件
   * @param status        状态值，16进制
   * @param deviceType    设备类型
   * @param deviceChildType 设备子类型
   */
  constructor(status: string, deviceType?: string, deviceChildType?: string) {
    super(status, deviceType, deviceChildType);
    this.curtainStatus = new CurtainStatus(status);
  }

  /**
   * 设置状态
   * @param status 状态值 （0 关， 1 暂停， 2 开）
   */
  public setStatus (status: number): CurtainEquip | void {
    if (status < 0 || status > 2) return console.warn('value should be between 0 and 2')
    this.curtainStatus.setStatus(new this.Converter(status.toString(), 10).toHex())
    return this
  }

  /**
   * 开启
   */
  public open (): CurtainEquip | void {
    return this.setStatus(Operation.OPEN)
  }
  /**
   * 暂停
   */
  public pause (): CurtainEquip | void {
    return this.setStatus(Operation.PAUSE)
  }

  /**
   * 停止
   */
  public stop (): CurtainEquip | void {
    return this.setStatus(Operation.STOP)
  }

  /**
   * 获取状态字节串
   */
  public getbytes(): string {
    return this.bytes.format(this.curtainStatus.getStatus())
  }
}
