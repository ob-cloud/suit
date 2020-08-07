"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Converter = void 0;
/**
 * 进制转换
 * @ignore
 * @param {string} value 转换的值
 * @param {number} from 将 from进制(2|8|10|16) 转成 to 进制
 * @param {number} to 目标进制
 */
var _fn = function (value, from, to) {
    return parseInt(value, from).toString(to);
};
var _toBinary = function (value, from) {
    return _fn(value, from, 2);
};
var _toOctal = function (value, from) {
    return _fn(value, from, 8);
};
var _toDecimal = function (value, from) {
    var radix = _fn(value, from, 10);
    return +radix < 10 ? "0" + radix : radix;
};
var _toHex = function (value, from) {
    var radix = _fn(value, from, 16);
    return +radix < 16 ? "0" + radix : radix;
};
var _fillLength = function (value, len) {
    return (new Array(len + 1).fill('0').join('') + value).slice(-len);
};
var Converter = /** @class */ (function () {
    function Converter(value, from) {
        this.value = '';
        this.from = 10;
        if (!value || !from)
            return this;
        this.value = value;
        this.from = from;
        return this;
    }
    Converter.prototype.toBinary = function () {
        return _toBinary(this.value, this.from);
    };
    Converter.prototype.toOctal = function () {
        return _toOctal(this.value, this.from);
    };
    Converter.prototype.toDecimal = function () {
        return _toDecimal(this.value, this.from);
    };
    Converter.prototype.toHex = function () {
        return _toHex(this.value, this.from);
    };
    Converter.prototype.fill = function (len) {
        return _fillLength(this.value, len);
    };
    return Converter;
}());
exports.Converter = Converter;
// export default {
//   toBinary: _toBinary,
//   toOctal: _toOctal,
//   toDecimal: _toDecimal,
//   toHex: _toHex,
//   fillLength: _fillLength
// }
