/*
 * @Author: eamiear
 * @Date: 2019-08-12 11:22:42
 * @Last Modified by: eamiear
 * @Last Modified time: 2019-08-22 18:12:32
 */
import Suiter from './suiter'
import Converter from './converter'
import s from '../utils/string'

/**
 * 类型检测器
 * @class
 * @name TypeHints
 */
class TypeHints {
  constructor () {
    this.__rootProcessor()
    this.__subDeviceProcessor()
  }
  /**
   * 判断套件设备一级类型
   * @private
   * @name __handler
   * @param {object} suitsType 套件类型对象
   * @param {number} type 套件类型
   * @param {number} [subType]  套件子类型
   */
  __handler (suitsType, type, subType) {
    if (!suitsType) return false
    if (!subType) {
        return !!suitsType[type]
    }
    const typeStr = type + subType + ''
    return !!suitsType[typeStr]
  }
  /**
   * 设备子类型处理器
   * @private
   * @name __handleSubType
   * @param {Object} group 子类型分组
   * @param {String} subType 子设备类型
   */
  __handleSubType (group, subType) {
    return group.includes(subType + '')
  }
  /**
   * 一级设备类型判断方法生成器
   * @private
   *
   * @example
   * this.isSensor = (type, subType) => {}
   */
  __rootProcessor () {
    // const typeList = Array.from(Object.keys(Suiter)).map(item => item.slice(0, 1).toUpperCase() + item.slice(1))
    // typeList.forEach(item => {
    //   this[`is${item}`] = (deviceType, deviceSubType) => {
    //     return this.__handler(Suiter[item.toLocaleLowerCase()], deviceType, deviceSubType)
    //   }
    // })
    Array.from(Object.keys(Suiter)).map(item => {
      const types = Suiter[item].type
      const keyCapital = item.toCapital()
      this[`is${keyCapital}`] = (deviceType, deviceSubType) => {
        return this.__handler(types, deviceType, deviceSubType)
      }
    })
  }
  /**
   * 子设备类型，判断方法生成器+状态码长度生成器
   * @private
   * @example
   * this.isTouchSensor = (deviceSubType) => {}
   */
  __subDeviceProcessor () {
    Array.from(Object.keys(Suiter)).map(item => {
      const group = Suiter[item].group
      const statusLength = Suiter[item].statusLength
      const itemKey = item.toCapital() // sensors --> Sensors
      if (group) { //判断方法生成器
        Array.from(Object.keys(group)).map((groupKey) => {
          const key = groupKey.toCapital() // touch --> Touch
          this[`is${key}${itemKey}`] = (deviceSubType) => { // this.isTouchSensor = (deviceSubType) => {}
            return this.__handleSubType(group[groupKey], deviceSubType)
          }
        })
      }
      if (statusLength) { //状态码长度生成器
        this[`statusLength${itemKey}`] = (deviceSubType) => { // this.statusLengthSocketSwitch = (deviceSubType) => {}
          return statusLength[deviceSubType] || 8
        }
      }
    })
  }
}

export default new TypeHints()
