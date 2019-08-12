/*
 * @Author: eamiear
 * @Date: 2019-08-12 11:21:09
 * @Last Modified by: eamiear
 * @Last Modified time: 2019-08-12 11:21:41
 */

/**
 * 进制转换
 * @param {string|number} number 转换的值
 * @param {number} from 从2|8|10|16转成 to 进制
 * @param {number} to 目标进制
 */
function _fn (number, from, to) {
  return parseInt(number, +from).toString(+to)
}
function toBinary (number, from) {
  return _fn(number, from).toString(2)
}
function toOctal (number, from) {
  const radix = _fn(number, from, 8)
  return +radix < 8 ? '0' + radix : radix
}
function toDecimal (number, from) {
  const radix = _fn(number, from, 10)
  return +radix < 10 ? '0' + radix : radix
}
function toHex (number, from) {
  const radix = _fn(number, from, 16)
  return +radix < 16 ? '0' + radix : radix
}

export const Converter = {
  toBinary,
  toDecimal,
  toOctal,
  toHex
}

export default Converter
