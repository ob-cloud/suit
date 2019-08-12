/*
 * @Author: eamiear
 * @Date: 2019-08-12 11:25:00
 * @Last Modified by: eamiear
 * @Last Modified time: 2019-08-12 11:32:42
 */

import Converter from './converter'
import TypeHints from './typeHints'
import {SuitStatus} from './suiter'
/**
 * @class
 * @classdesc 状态描述器 命名规则： get[设备类型名称]StatusDescriptor； 设备类型名称与SuiterMap配置表的key字段相同，如led --> getLedStatusDescriptor
 */
class StatusDescriptor {
  constructor () {
  }
  /**
   * 设备类型码+状态码
   * @param {string} deviceType 设备类型码
   * @param {string} status 状态码
   */
  __getStatusKey (deviceType, status) {
    return `${deviceType}${status}`
  }
  /**
   * 组合状态描述 -- 010010 --> 开/关/置反
   * @param {string} deviceType 设备类型
   * @param {string | number} number 16进制状态码
   */
  __combineStatus (deviceType, number) {
    const binary = Converter.toBinary(number, 16)
    let descriptor = ''
    let binaryList = binary.length % 2 ? `0${binary}` : binary
    for (let i = 0; i <= binaryList.length; i+2) {
      descriptor += SuitStatus[this.__getStatusKey(deviceType, binary.slice(i, i + 2))] + '/'
    }
    return descriptor.slice(0, -1)
  }
  /**
   * 获取插座开关状态
   * @param {string} status 16进制状态码
   * @param {string} deviceType 设备类型状态码
   * @param {string} deviceSubType 设备子类型状态码
   */
  getSocketSwitchStatusDescriptor (status, deviceType, deviceSubType) {
    if (!deviceSubType) return SuitStatus[this.__getStatusKey(deviceType, status.slice(6, 8))]

    if (TypeHints.isTouchSocketSwitch(deviceSubType) || TypeHints.isNormalSocketSwitch(deviceSubType)) {
      return this.__combineStatus(deviceType, status.slice(0, 2))
    }

    if (TypeHints.isSceneSocketSwitch(deviceSubType)) {
      return this.__combineStatus(deviceType, status.slice(6, 8))
    }
  }
  /**
   * 获取LED灯状态
   * @param {string} status 16进制状态码
   * @param {string} deviceType 设备类型状态码
   */
  getLedStatusDescriptor (status, deviceType) {
    const light = Converter.toBinary(status.slice(0, 2))
    if (+light > 1) {
      let code = light < 43 ? '43' : (light > 43 && light < 86 ? '86' : (light > 86 && light < 129 ? '129' : (light > 129 && light < 172 ? '172' : (light < 172 && light > 215 ? '215' : '254'))))
      return SuitStatus[this.__getStatusKey(deviceType, code)]
    } else {
      return SuitStatus[this.__getStatusKey(deviceType, status.slice(0, 2))]
    }
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
  getLockStatusDescriptor (status, deviceType) {
    const cmd = status.slice(2, 4)
    const cmdMap = {
      'c3': Converter.toDecimal(status.slice(10, 12), 16),
      'cd': '2'
    }
    return SuitStatus[this.__getStatusKey(deviceType, (cmdMap[cmd] || '-1'))]
  }
  /**
   * 获取OBOX状态
   * @param {string} status 16进制状态码
   * @param {string} deviceType 设备类型状态码
   */
  getOboxStatusDescriptor(status, deviceType) {
    return SuitStatus[this.__getStatusKey(deviceType, status.slice(0, 1))]
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
  getWireControlPanelStatusDescriptor(status, deviceType) {

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
