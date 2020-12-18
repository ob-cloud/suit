/*
 * @Author: eamiear
 * @Date: 2020-12-18 14:25:16
 * @Last Modified by: eamiear
 * @Last Modified time: 2020-12-18 15:54:35
 */
import { Converter } from '../utils/converter';
import { SwitchStatus } from './SwitchStatus';
/**
 * 智能插座
 */
export class SwitchPlugStatus extends SwitchStatus {
  public state: string = '';  // 开关状态
  typeState: string;  // 类型
  timeState: string;  // 上报时间
  overloadPowerState: string;   // 过载功率
  curPowerState: string;  // 当前功率
  kWhState: string; // 用电量
  extraCount: number;
  extraState: string;
  extraKeyDots: never[];
  constructor (status: string, count?: Array<number>) {
    super(status, count)
    this.typeState = status.slice(0, 2)
    this.timeState = status.slice(2, 4)
    this.overloadPowerState = status.slice(6, 8)
    this.curPowerState = status.slice(8, 12)
    this.kWhState = status.slice(12, 16)

    this.state = status.slice(4, 6)

    this.extraCount = 0
    this.extraState = ''
    this.extraKeyDots = []
  }

  setExtraKeyDots (v: string, index: number):SwitchPlugStatus {
    console.log(v, index)
    return this
  }
  /**
   * 获取按键值
   * @param index 索引
   */
  getExtraKeyDotByIndex (index: number) {
    console.log(index)
    return ''
  }

  getExtraState () {
    return ''
  }
}
