/*
 * @Author: eamiear
 * @Date: 2020-08-29 20:16:40
 * @Last Modified by: eamiear
 * @Last Modified time: 2020-12-17 17:00:40
 */
import { SwitchStatus } from '../entity/SwitchStatus';
import { BaseEquip } from './BaseEquip';

enum SwitchKeyStatus {
  ON = 1,
  OFF = 0
}

// 按键类型索引 3|3
enum SwitchKeyTypeIndex {
  NORMAL = 0, // 普通
  SCENE = 1 // 情景
}

const SwitchKeyTypeIndexMap:any = {
  [SwitchKeyTypeIndex.NORMAL]: 'normal',
  [SwitchKeyTypeIndex.SCENE]: 'scene'
}

const SwitchKeyStatusMap: any = {
  [SwitchKeyStatus.ON]: '开',
  [SwitchKeyStatus.OFF]: '关'
}

export class SwitchEquip extends BaseEquip {
  switchStatus: SwitchStatus;
  typeStr: any;
  private readonly bytes = `{0}00000000000000`;
  constructor(status: string, deviceType?: string, deviceChildType?: string) {
    super(status, deviceType, deviceChildType)
    this.typeStr = this.TypeHints.getSocketSwitchTypeIndex(deviceType, deviceChildType)
    this.switchStatus = new SwitchStatus(status, [+this.getKeyCount()])
  }
  /**
   * 类型索引 1|3
   */
  get typeIndex () {
    return this.typeStr
  }
  /**
   * 开关类型标志
   * {
   *   normal: 1,
   *   scene: 0
   * }
   */
  get keyTypes () {
    if (!this.typeStr) return ''
    const types = this.typeStr.split('|')
    const typeObj:any = {
      normal: 0,
      scene: 0
    }
    for (let index = 0; index < types.length; index++) {
      const t = types[index]
      typeObj[SwitchKeyTypeIndexMap[index]] = +!!t
    }
    return typeObj
  }
  /**
   * 按键
   * ['00', '01', '10', '11']
   */
  get keyDots () {
    return this.switchStatus.keyDots
  }
  /**
   * 按键数
   */
  get keyCount () {
    return +this.getKeyCount()
  }
  private getKeyCount () {
    if (!this.typeStr || !this.typeStr.length) return 1
    let keys = this.typeStr.split('|')
    keys = keys.filter((it: any) => it)
    return keys.reduce((a:any, b:any) => +a + (+b)) || 1
  }
  setPower (v: number, index: number) {
    const vb = new this.Converter(`${v}`, 10).toBinary()
    this.switchStatus.setKeyDot(vb, index)
  }
  getPower (index?: number): Array<string> {
    if (index !== undefined) {
      const v = this.switchStatus.getKeyDotByIndex(index)
      const vd = new this.Converter(`${v}`, 2).toDecimal()
      return [vd]
    } else {
      return this.keyDots.map(item =>  new this.Converter(`${item}`, 2).toDecimal())
    }
  }
  getPowerInt (index?: number): Array<number> {
    const powers = this.getPower(index)
    return powers.map(item => +item > 1 ? 0 : +item)
  }
  getBytes () {
    const keyDots = this.switchStatus.keyDots.reverse()
    const status = new this.Converter(keyDots.join('') || '00', 2).toHex()
    return this.bytes.format(status)
  }
}
