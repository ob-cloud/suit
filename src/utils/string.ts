String.prototype.toCapital = function(): string {
  return this.slice(0, 1).toUpperCase() + this.slice(1);
};

String.prototype.toLower = function(): string {
  return this.slice(0, 1).toLowerCase() + this.slice(1);
};
/**
 * 向左补充0， 默认16位
 */
String.prototype.padLeft = function(maxLength: number = 16): string {
  return this.padStart(maxLength, '0')
}
/**
 * 向右补充0，默认16位
 */
String.prototype.padRight = function(maxLength: number = 16): string {
  return this.padEnd(maxLength, '0')
}
/**
 * 转为16进制数值字符串
 */
String.prototype.toHexNumber = function(): string {
  if (!this.toString()) return ''
  return parseInt(this.toString(), 16).toString()
}
// 单个数字转为偶数
String.prototype.toEven = function(): string {
  return this.toString().length > 1 ? this.toString() : this.padLeft(2);
}
String.prototype.toEvenHex = function(): string {
  return this.toEven();
}
/**
 * 16进制数组转为偶数16进制字符串
 */
String.prototype.toEvenHexWithArray = function(hex: Array<string>): string {
  if (!hex || !hex.length) return ''
  return hex.map(h => h.toEvenHex()).join('')
}
String.prototype.format = function(..._args: readonly string[]) {
  if (arguments.length === 0) {
    return this.toString();
  }
  const param = arguments[0]
  let s = this;
  if (typeof param === 'object') {
    for (let key in param) {
      s = s.replace(new RegExp('\\{' + key + '\\}', 'g'), param[key])
    }
    return s.toString()
  } else {
    for (let i = 0; i < arguments.length; i++) {
      s = s.replace(new RegExp('\\{' + i + '\\}', 'g'), arguments[i]);
    }
    return s.toString();
  }
};
