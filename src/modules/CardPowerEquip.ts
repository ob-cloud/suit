/*
 * @Author: eamiear
 * @Date: 2020-10-12 17:33:54
 * @Last Modified by: eamiear
 * @Last Modified time: 2020-10-12 17:35:05
 */
import { CardPowerStatus } from "../entity/CardPowerStatus";
import { BaseEquip } from "./BaseEquip";

/**
 * 插卡取电
 */
export class CardPowerEquip extends BaseEquip {
  public readonly cardPowerStatus: CardPowerStatus;
  private readonly bytes = `{0}{1}000000000000`;

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
}
