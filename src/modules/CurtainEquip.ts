
import { BaseEquip } from './BaseEquip';
import { CurtainStatus } from '../entity/CurtainStatus';

 /**
  * 操作枚举
  */
 enum CurtainStatusEnum {
  STOP = 0,
  PAUSE = 1,
  OPEN = 2,
}

const CurtainStatusMap:any = {
  [CurtainStatusEnum.STOP]: '关',
  [CurtainStatusEnum.PAUSE]: '暂停',
  [CurtainStatusEnum.OPEN]: '开'
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

  get curStatus () {
    return this.curtainStatus.getStatus()
  }

  get curStatusInt () {
    return +new this.Converter(this.curStatus, 2).toDecimal()
  }

  /**
   * 获取按键电源/活跃状态
   */
  getPower () {
    const v = this.curStatusInt
    let power = [0, 0, 0]
    if (v >= 0) power[v] = 1
    return power
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
    return this.setStatus(CurtainStatusEnum.OPEN)
  }
  /**
   * 暂停
   */
  public pause (): CurtainEquip | void {
    return this.setStatus(CurtainStatusEnum.PAUSE)
  }

  /**
   * 停止
   */
  public stop (): CurtainEquip | void {
    return this.setStatus(CurtainStatusEnum.STOP)
  }

  /**
   * 获取窗帘状态
   */
  getStatusDescriptor () {
    return CurtainStatusMap[this.curStatusInt] || ''
  }
  /**
   * 获取状态字节串
   */
  public getBytes(): string {
    return this.bytes.format(this.curtainStatus.getStatus())
  }
}
