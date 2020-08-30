/**
 * 进制转换
 * @ignore
 * @param {string} value 转换的值
 * @param {number} from 将 from进制(2|8|10|16) 转成 to 进制
 * @param {number} to 目标进制
 */
const _fn = (value: string, from: number, to: number): string => {
  return parseInt(value, from).toString(to);
};

const _toBinary = (value: string, from: number): string => {
  return _fn(value, from, 2);
};

const _toOctal = (value: string, from: number): string => {
  return _fn(value, from, 8);
};

const _toDecimal = (value: string, from: number): string => {
  const radix = _fn(value, from, 10);
  return +radix < 10 ? `0${radix}` : radix;
};

const _toHex = (value: string, from: number): string => {
  const radix = _fn(value, from, 16);
  return +radix < 16 ? `0${radix}` : radix;
};

const _fillLength = (value: string | number, len: number): string => {
  return (new Array(len + 1).fill('0').join('') + value).slice(-len);
};

/**
 * 转换器
 */
export class Converter {
  public readonly value: string = '';
  public readonly from: number = 10;
  /**
   * @param value 待转换的数值字符串
   * @param from 数值进制类型（二进制、八进制、十进制、十六进制）
   */
  constructor(value: string, from: number) {
    if (!value || !from) {
      return this;
    }
    this.value = value;
    this.from = from;
    return this;
  }
  /**
   * 转为二进制
   */
  public toBinary(): string {
    return _toBinary(this.value, this.from);
  }
  /**
   * 转为八进制
   */
  public toOctal(): string {
    return _toOctal(this.value, this.from);
  }
  /**
   * 转为十进制
   */
  public toDecimal(): string {
    return _toDecimal(this.value, this.from);
  }
  /**
   * 转为十进制数值
   */
  public toDecimalNumber (): number {
    return parseInt(this.value, this.from)
  }
  /**
   * 转为十六进制
   */
  public toHex(): string {
    return _toHex(this.value, this.from);
  }
  /**
   * 获取指定长度字符串
   * @param len 字符串长度
   */
  public fill(len: number): string {
    return _fillLength(this.value, len);
  }
}

export const toBinary = _toBinary;
export const toOctal = _toOctal;
export const toDecimal = _toDecimal;
export const toHex = _toHex;
export const fillLength = _fillLength;
