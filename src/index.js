/*
 * @Author: eamiear
 * @Date: 2019-08-12 11:28:24
 * @Last Modified by: eamiear
 * @Last Modified time: 2019-08-22 16:14:33
 */

import Converter from './modules/converter'
import TypeHints from './modules/typeHints'
import StatusDescriptor from './modules/statusDescriptor'
import Suiter, {SuitTypes} from './modules/suiter'

/**
 * 套件类
 * <pre>
 * 协议格式：
 * ===================================================
 * | 节点完整地址 | 情景开关状态 | 按键开关状态 | 填充0 |
 * ===================================================
 * | 7 bytes     | 1bytes      | bytes      |44bytes|
 * ===================================================
 *
 * 结果返回状态state值："0008000000000000"
 * 16个字符 8 个字节
 *
 * 这里的state值只包含状态字节值，不包含“地址节点”：
 *
 * 00 08 000000000000
 *
 * 00 表示情景开关状态字节
 * 08 表示按键开关状态字节
 * 后面的0为填充值
 * </pre>
 * @class
 * @name Suit
 */
class Suit {
  constructor () {
    /**
     * 类型检测器
     * @memberof Suit
     */
    this.typeHints = TypeHints
    /**
     * 状态描述器
     * @memberof Suit
     */
    this.statusDescriptor = StatusDescriptor
  }
  /**
   * 获取主设备类型描述信息
   * @param {string} deviceType 设备类型
   * @returns 设备类型值
   */
  getRootDeviceDescriptor (deviceType) {
    return SuitTypes[Converter.toDecimal(deviceType, 16)]
  }
  /**
   * 设备子类型
   * @param {string} deviceType 设备类型
   * @param {string} deviceSubType 设备子类型
   * @returns 设备类型值
   */
  getDeviceTypeDescriptor (deviceType, deviceSubType) {
    const typeStr = Converter.toDecimal(deviceType, 16)
    const subTypeStr = Converter.toDecimal(deviceSubType, 16)
    return SuitTypes[typeStr + subTypeStr]
  }
  /**
   * 设备状态
   * @param {string} status 16进制状态码
   * @param {string} deviceType 设备类型
   * @param {string} deviceSubType 设备子类型
   */
  getStatusDescriptor (status, deviceType, deviceSubType) {
    const typeKey = Array.from(Object.keys(Suiter)).find(key => {
      const capKey = key.toCapital()
      return this.typeHints[`is${capKey}`].call(this.typeHints, deviceType)
    })
    const statusMethodName = `get${typeKey.toCapital()}StatusDescriptor`
    if (this.statusDescriptor[statusMethodName]) {
      return this.statusDescriptor[statusMethodName].call(this.statusDescriptor, status, deviceType, deviceSubType)
    }
  }
 }

 export default new Suit()
