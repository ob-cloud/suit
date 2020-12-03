/*
 * @Author: eamiear
 * @Date: 2020-10-12 17:33:54
 * @Last Modified by: eamiear
 * @Last Modified time: 2020-12-03 10:55:50
 */
import { CardPowerStatus } from "../entity/CardPowerStatus";
import { BaseEquip } from "./BaseEquip";

enum CardStatus {
  IN = '0',
  OUT = '1',
  OFF = '2',
}

const CardStatusMap: any = {
  [CardStatus.IN]: '取电中',
  [CardStatus.OUT]: '拔卡',
  [CardStatus.OFF]: '断电'
}

enum CardActionStatus {
  ENABLE = 0,
  DISABLE = 1
}

/**
 * 插卡取电
 */
export class CardPowerEquip extends BaseEquip {
  public readonly cardPowerStatus: CardPowerStatus;
  private readonly bytes = `{0}{1}{2}00000000000`;

  /**
   * 插卡取电
   * @param status        状态值，16进制
   * @param deviceType    设备类型
   * @param deviceChildType 设备子类型
   */
  constructor(status: string, deviceType?: string, deviceChildType?: string) {
    super(status, deviceType, deviceChildType);
    this.cardPowerStatus = new CardPowerStatus(status);
  }
  /**
   * 获取状态字节串
   */
  public getbytes(): string {
    return ''
  }

  getStatusDescriptor(): string {
    const status = new this.Converter(this.cardPowerStatus.state, 16).toDecimalNumber()
    return CardStatusMap[status]
  }

  getActionStatus(): number {
    const actionStatus = new this.Converter(this.cardPowerStatus.actionState, 2).toDecimalNumber()
    if (actionStatus === undefined || actionStatus === null) return 1
    return actionStatus
  }
}
