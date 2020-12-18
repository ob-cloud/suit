
// 模式
export const ModeMap: any = {
  1: 'a',
  2: 'r',
  3: 'd',
  4: 'w',
  5: 'h'
}
/**
 * 模式描述表
 */
export const ModeDescriptorMap: any = {
  1: '自动',
  2: '制冷',
  3: '抽湿',
  4: '送风',
  5: '制热'
}
// 风速
export const SpeedMap: any = {
  0: 's0',
  1: 's1',
  2: 's2',
  3: 's3'
}
export const SpeedDescriptorMap: any = {
  0: '自动',
  1: '弱',
  2: '中',
  3: '强'
}
// 左右摆风
export const HorizontalWingMap: any = {
  0: 'l0', // 关闭
  1: 'l1'
}
// 上下摆风
export const VerticalWingMap: any = {
  0: 'u0', // 关闭
  1: 'u1'
}
export const WingDescriptorMap: any = {
  'l0': '',
  'l1': '左右',
  'u0': '',
  'u1': '上下'
}


export enum WireMode {
  OFF = 0,
  ON = 1,
  COLD = 2,
  HOT = 3
}
export const WireModeMap: any = {
  [WireMode.OFF]: '00',
  [WireMode.ON]: '01',
  [WireMode.ON]: '01',
  [WireMode.COLD]: '21',
  [WireMode.HOT]: '51',
}
export const WireModeDescriptorMap: any = {
  [WireMode.OFF]: '关机',
  [WireMode.ON]: '开机',
  [WireMode.COLD]: '制冷',
  [WireMode.HOT]: '制热',
}

export enum WireSpeed {
  AUTO = 0,
  WEAK = 1,
  MEDIUM = 2,
  STRONG = 3
}
export const WireSpeedMap: any = {
  [WireSpeed.AUTO]: '00',
  [WireSpeed.WEAK]: '01',
  [WireSpeed.MEDIUM]: '02',
  [WireSpeed.STRONG]: '03',
}
export const WireSpeedDescriptorMap: any = {
  [WireSpeed.AUTO]: '自动',
  [WireSpeed.WEAK]: '弱风',
  [WireSpeed.MEDIUM]: '中风',
  [WireSpeed.STRONG]: '强风',
}

export enum WireHWing {
  ON = 1,
  OFF = 0
}
export const WireHWingMap: any = {
  [WireHWing.ON]: '01',
  [WireHWing.OFF]: '00'
}
export const WireHWingDescriptorMap: any = {
  [WireHWing.ON]: '左右',
  [WireHWing.OFF]: ''
}

export enum WireVWing {
  ON = 1,
  OFF = 0
}
export const WWireVWingMap: any = {
  [WireVWing.ON]: '01',
  [WireVWing.OFF]: '00'
}
export const WireVWingDescriptorMap: any = {
  [WireVWing.ON]: '上下',
  [WireVWing.OFF]: ''
}
