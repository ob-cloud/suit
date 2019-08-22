/*
 * @Author: eamiear
 * @Date: 2019-08-12 11:21:09
 * @Last Modified by: eamiear
 * @Last Modified time: 2019-08-22 16:05:55
 */

/**
 * 进制转换
 * @ignore
 * @param {string|number} number 转换的值
 * @param {number} from 从2|8|10|16转成 to 进制
 * @param {number} to 目标进制
 */
function _fn (number, from, to) {
  return parseInt(number, +from).toString(+to)
}
/**
 * 转为二进制字符串
 * @memberof Converter
 * @param {String|Number} number 转换的值
 * @param {Number} from x进制值
 */
function toBinary (number, from) {
  return _fn(number, from, 2)
}
/**
 * 转为八进制字符串
 * @memberof Converter
 * @param {String|Number} number 转换的值
 * @param {Number} from x进制值
 */
function toOctal (number, from) {
  const radix = _fn(number, from, 8)
  return +radix < 8 ? '0' + radix : radix
}
/**
 * 转为十进制字符串
 * @memberof Converter
 * @param {String|Number} number 转换的值
 * @param {Number} from x进制值
 */
function toDecimal (number, from) {
  const radix = _fn(number, from, 10)
  return +radix < 10 ? '0' + radix : radix
}
/**
 * 转为16进制字符串
 * @public
 * @memberof Converter
 * @param {String|Number} number 转换的值
 * @param {Number} from x进制值
 */
function toHex (number, from) {
  const radix = _fn(number, from, 16)
  return +radix < 16 ? '0' + radix : radix
}
/**
 * 进制转换器
 * @namespace  Converter
 */
export const Converter = {
  toBinary,
  toDecimal,
  toOctal,
  toHex
}

export default Converter
