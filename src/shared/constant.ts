
///// 红外空调 ///////

// 电源
export enum PowerEnum {
  ON = 'on',
  OFF = 'off'
}
// 模式
export enum ModeEnum {
  AUTO = 1, // 自动
  COLD = 2, // 制冷
  WEDY = 3, // 抽湿
  WING = 4, // 送风
  HOT = 5 // 制热
}
export const ModeMap: any = {
  [ModeEnum.AUTO]: 'a',
  [ModeEnum.COLD]: 'r',
  [ModeEnum.WEDY]: 'd',
  [ModeEnum.WING]: 'w',
  [ModeEnum.HOT]: 'h'
}
/**
 * 模式描述表
 */
export const ModeDescriptorMap: any = {
  [ModeEnum.AUTO]: '自动',
  [ModeEnum.COLD]: '制冷',
  [ModeEnum.WEDY]: '抽湿',
  [ModeEnum.WING]: '送风',
  [ModeEnum.HOT]: '制热'
}

// 风速
export enum SpeedEnum {
  AUTO = 0,
  WEAK = 1,
  MEDIUM = 2,
  STRONG = 3
}
export const SpeedMap: any = {
  [SpeedEnum.AUTO]: 's0',
  [SpeedEnum.WEAK]: 's1',
  [SpeedEnum.MEDIUM]: 's2',
  [SpeedEnum.STRONG]: 's3'
}
export const SpeedDescriptorMap: any = {
  [SpeedEnum.AUTO]: '自动',
  [SpeedEnum.WEAK]: '弱',
  [SpeedEnum.MEDIUM]: '中',
  [SpeedEnum.STRONG]: '强'
}
// 左右摆风
export enum HWingEnum {
  ON = 1,
  OFF = 0
}
export const HorizontalWingMap: any = {
  [HWingEnum.OFF]: 'l0', // 关闭
  [HWingEnum.ON]: 'l1'
}

// 上下摆风
export enum VWingEnum {
  ON = 1,
  OFF = 0
}
export const VerticalWingMap: any = {
  [VWingEnum.OFF]: 'u0', // 关闭
  [VWingEnum.ON]: 'u1'
}
export const WingDescriptorMap: any = {
  'l0': '',
  'l1': '左右',
  'u0': '',
  'u1': '上下'
}


////// 线控空调 ///////

// 模式
export enum WireMode {
  OFF = 0,
  ON = 1,
  COLD = 2,
  HOT = 3
}
export const WireModeMap: any = {
  [WireMode.OFF]: '00',
  [WireMode.ON]: '01',
  [WireMode.COLD]: '21',
  [WireMode.HOT]: '51',
}
export const WireModeDescriptorMap: any = {
  [WireMode.OFF]: '关',
  [WireMode.ON]: '开',
  [WireMode.COLD]: '制冷',
  [WireMode.HOT]: '制热',
}

// 风速
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

// 左右摆风
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

// 上下摆风
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
