/*
 * @Author: eamiear
 * @Date: 2019-08-12 11:25:00
 * @Last Modified by: eamiear
 * @Last Modified time: 2019-08-23 10:27:05
 */

import Converter from './converter'
import TypeHints from './typeHints'
import {SuitStatus} from './suiter'
/**
 * @class
 * @classdesc 状态描述器<br>
 *
 * <pre>
 * 命名规则： get[设备类型名称]StatusDescriptor； 设备类型名称与SuiterMap配置表的key字段相同，<br>
 * 如led --> getLedStatusDescriptor<br>
 * </pre>
 */
class StatusDescriptor {
  constructor () {
  }
  /**
   * 设备类型码+状态码
   * @private
   * @param {string} deviceType 设备类型码
   * @param {string} status 状态码
   */
  __getStatusKey (deviceType, status) {
    return `${deviceType}${status}`
  }
  /**
   * 组合状态描述 -- 010010 --> 开/关/置反
   * @private
   * @param {string} deviceType 设备类型
   * @param {string | number} number 16进制状态码
   */
  __combineSocketStatus (deviceType, number) {
    let bitStr = Converter.toBinary(number, 16)
    let descriptor = []
    // 长度，奇数转偶数
    bitStr = bitStr.length % 2 ? `0${bitStr}` : bitStr
    for (let i = bitStr.length; i > 0; i -= 2) {
      descriptor.push(SuitStatus[this.__getStatusKey(deviceType, bitStr.slice(i - 2, i))])
    }
    return descriptor.join(',')
  }
  /**
   * 0401 socket 取第一个字节，后四位bit决定状态（特殊: 一个位一个状态）
   * @private
   * @param {string} status 16进制状态码
   */
  __parseSimpleSocket (deviceType, status) {
    let bitStr = Converter.toBinary(status.slice(0, 2), 16)
    bitStr = bitStr.slice(-4)
    return SuitStatus[this.__getStatusKey(deviceType, `s${bitStr.includes('1') ? 1 : 0}`)]
  }
  /**
   * 获取插座开关状态
   * @param {string} status 16进制状态码
   * @param {string} deviceType 设备类型状态码
   * @param {string} deviceSubType 设备子类型状态码
   */
  getSocketSwitchStatusDescriptor (status, deviceType, deviceSubType) {
    if (!deviceSubType) return SuitStatus[this.__getStatusKey(deviceType, status.slice(6, 8))]
    // 智能插座
    if (TypeHints.isSimpleSocketSwitch(deviceSubType)) {
      return this.__parseSimpleSocket(deviceType, status)
    }
    // TODO 单键、双键、三键、四键开关区分 ==》 开、开/关、开/开/关、关/关/关/开
    if (TypeHints.isTouchSocketSwitch(deviceSubType) || TypeHints.isNormalSocketSwitch(deviceSubType)) {
      return this.__combineSocketStatus(deviceType, status.slice(0, 2))
    }

    if (TypeHints.isMixSocketSwitch(deviceSubType)) {
      return this.__combineSocketStatus(deviceType, status.slice(2, 4))
    }

    if (TypeHints.isSceneSocketSwitch(deviceSubType)) {
      return this.__combineSocketStatus(deviceType, status.slice(6, 8))
    }
  }
  /**
   * 获取LED灯状态
   * @param {string} status 16进制状态码
   * @param {string} deviceType 设备类型状态码
   */
  getLedStatusDescriptor (status, deviceType, deviceSubType) {
    let light = 0
    let num = +Converter.toDecimal(status.slice(0, 2), 16)
    if (TypeHints.isSimpleLed(deviceSubType)) {
      light = num === 0 ? '灯灭' : `${parseInt((num - 128) * 100 / 126)}%`
    }
    if (TypeHints.isColorLed(deviceSubType)) {
      light = `${num}%`
    }
    if (TypeHints.isWayLed(deviceSubType)) {
      light = `${num}% ${+Converter.toDecimal(status.slice(2, 4), 16)}% ${+Converter.toDecimal(status.slice(4, 6), 16)}%`
    }
    return light
  }
  /**
   * 获取传感器状态
   * @param {string} status 16进制状态码
   * @param {string} deviceType 设备类型状态码
   * @param {string} deviceSubType 设备子类型状态码
   */
  getSensorsStatusDescriptor (status, deviceType, deviceSubType) {
    // ac sensor
    if (!deviceSubType || TypeHints.isAcSensor(deviceSubType)) return SuitStatus[this.__getStatusKey(deviceType, status.slice(8, 10))]

    // cardSenseSensor
    if (TypeHints.isCardSenseSensors(deviceSubType)) return SuitStatus[this.__getStatusKey(deviceType, status.slice(0, 2))]
  }
  /**
   * 获取门锁状态
   * @param {string} status 16进制状态码
   * @param {string} deviceType 设备类型状态码
   */
  getDoorLockStatusDescriptor (status, deviceType) {
    // const cmd = status.slice(2, 4)
    // const cmdMap = {
    //   'c3': Converter.toDecimal(status.slice(10, 12), 16),
    //   'cd': '2'
    // }
    // return SuitStatus[this.__getStatusKey(deviceType, (cmdMap[cmd] || '-1'))]
    const _this = this
    function _openTypeStatus (byte) {
      return SuitStatus[_this.__getStatusKey(deviceType, `open${Converter.toDecimal(byte, 16)}`)]
    }
    function _closeTypeStatus (byte) {
      return SuitStatus[_this.__getStatusKey(deviceType, `close${Converter.toDecimal(byte, 16)}`)]
    }
    const cmd = status.slice(0, 2)
    const cmdMap = {
      '0xc3': _openTypeStatus(status.slice(8, 10)),
      '0xcd': SuitStatus[this.__getStatusKey(deviceType, 'card')],
      '0xc6': _closeTypeStatus(status.slice(2, 4))
    }
    return cmdMap[cmd] || SuitStatus['default']
  }
  /**
   * 获取OBOX状态
   * @param {string} status 16进制状态码
   * @param {string} deviceType 设备类型状态码
   */
  getOboxStatusDescriptor(status, deviceType) {

  }
  /**
   * 获取电饭煲状态
   * @param {string} status 16进制状态码
   * @param {string} deviceType 设备类型状态码
   */
  getCookerStatusDescriptor(status, deviceType) {

  }
  /**
   * 获取加湿器状态
   * @param {string} status 16进制状态码
   * @param {string} deviceType 设备类型状态码
   */
  getHumidifierStatusDescriptor(status, deviceType) {

  }
  /**
   * 获取可开关类设备状态
   * @param {string} status 16进制状态码
   * @param {string} deviceType 设备类型状态码
   */
  getSwitchgearStatusDescriptor(status, deviceType) {
    const hexbyte = status.slice(0, 2)
    const num = Converter.toDecimal(hexbyte, 16)
    if (num === 4) {
      return Converter.toDecimal(status.slice(2, 4), 16) + '%'
    } else {
      return SuitStatus[this.__getStatusKey(deviceType, hexbyte)]
    }
  }
  /**
   * 风扇状态
   * @param {string} status 16进制状态码
   * @param {string} deviceType 设备类型状态码
   */
  getFansStatusDescriptor(status, deviceType) {

  }
  /**
   * 空气清洁器状态
   * @param {string} status 16进制状态码
   * @param {string} deviceType 设备类型状态码
   */
  getAirCleanerStatusDescriptor(status, deviceType) {

  }
  /**
   * tv
   * @param {string} status 16进制状态码
   * @param {string} deviceType 设备类型状态码
   */
  getTvStatusDescriptor(status, deviceType) {

  }
  /**
   * 网关
   * @param {string} status 16进制状态码
   * @param {string} deviceType 设备类型状态码
   */
  getGateWayStatusDescriptor(status, deviceType) {

  }
  /**
   * 抄表器
   * @param {string} status 16进制状态码
   * @param {string} deviceType 设备类型状态码
   */
  getMeterReaderStatusDecriptor(status, deviceType) {

  }
  /**
   * 远程控制面板
   * @param {string} status 16进制状态码
   * @param {string} deviceType 设备类型状态码
   */
  getWireControlPanelStatusDescriptor(status, deviceType, deviceSubType) {
    if (this.isAcWireControlPanel(deviceSubType)) {
      return SuitStatus[this.__getStatusKey(deviceType, status.slice(0, 2))]
    }

  }
  /**
   * 转发器
   * @param {string} status 16进制状态码
   * @param {string} deviceType 设备类型状态码
   */
  getTransponderStatusDescriptor(status, deviceType) {

  }
  /**
   * 远程控制
   * @param {string} status 16进制状态码
   * @param {string} deviceType 设备类型状态码
   */
  getRemoteControlStatusDescriptor(status, deviceType) {

  }
  /**
   * 自动移动器
   * @param {string} status 16进制状态码
   * @param {string} deviceType 设备类型状态码
   */
  getAutoMoverStatusDescriptor(status, deviceType) {

  }
  /**
   * 远程控制灯
   * @param {string} status 16进制状态码
   * @param {string} deviceType 设备类型状态码
   */
  getRemoteControlLampStatusDescriptor(status, deviceType) {

  }
}

export default new StatusDescriptor()
