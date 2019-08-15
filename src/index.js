/*
 * @Author: eamiear
 * @Date: 2019-08-12 11:28:24
 * @Last Modified by: eamiear
 * @Last Modified time: 2019-08-15 15:59:24
 */

import Converter from './modules/converter'
import TypeHints from './modules/typeHints'
import StatusDescriptor from './modules/statusDescriptor'
import Suiter, {SuitTypes} from './modules/suiter'

class Suit {
  constructor () {
    this.typeHints = TypeHints
    this.statusDescriptor = StatusDescriptor
  }
  /**
   * 获取主设备类型描述信息
   * @param {string} deviceType 设备类型
   */
  getRootDeviceDescriptor (deviceType) {
    return SuitTypes[Converter.toDecimal(deviceType, 16)]
  }
  /**
   * 设备子类型
   * @param {string} deviceType 设备类型
   * @param {string} deviceSubType 设备子类型
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
