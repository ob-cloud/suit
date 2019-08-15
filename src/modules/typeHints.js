/*
 * @Author: eamiear
 * @Date: 2019-08-12 11:22:42
 * @Last Modified by: eamiear
 * @Last Modified time: 2019-08-15 15:39:17
 */
import Suiter from './suiter'
import Converter from './converter'
require('../utils/string')
class TypeHints {
  constructor () {
    this.__rootProcessor()
    this.__subDeviceProcessor()
  }
  /**
   * 判断套件设备一级类型
   * @param {object} suitsType 套件类型对象
   * @param {number} type 套件类型
   * @param [options] {number}  subType 套件子类型
   */
  __handler (suitsType, type, subType) {
    if (!suitsType) return false
    if (!subType) {
        return !!suitsType[Converter.toDecimal(type, 16)]
    }
    const typeStr = Converter.toDecimal(type, 16) + Converter.toDecimal(subType, 16)
    return !!suitsType[typeStr]
  }
  __handleSubType (group, subType) {
    return group.includes(Converter.toDecimal(subType, 16))
  }
  /**
   * 一级设备类型判断方法生成器
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
   * 子设备类型，判断方法生成器
   * this.isTouchSensor = (deviceSubType) => {}
   */
  __subDeviceProcessor () {
    Array.from(Object.keys(Suiter)).map(item => {
      const group = Suiter[item].group
      const itemKey = item.toCapital() // sensors --> Sensors
      if (!group) return
      Array.from(Object.keys(group)).map((groupKey) => {
        const key = groupKey.toCapital() // touch --> Touch
        this[`is${key}${itemKey}`] = (deviceSubType) => { // this.isTouchSensor = (deviceSubType) => {}
          return this.__handleSubType(group[groupKey], deviceSubType)
        }
      })
    })
  }
}

export default new TypeHints()
