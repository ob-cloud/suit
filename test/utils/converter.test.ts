import { Converter, toBinary, toOctal, toHex } from '../../src/utils/converter'

describe('Converter类使用方式(10进制)', () => {
  const converter = new Converter('15', 10)
  test('十进制转为二进制', () => {
    expect(converter.toBinary()).toBe('1111')
  })
  test('十进制转为八进制', () => {
    expect(converter.toOctal()).toBe('17')
  })
  test('十进制转为16进制', () => {
    expect(converter.toHex()).toBe('f')
  })
})

describe('单个方法使用', () => {
  test('十进制转为二进制', () => {
    expect(toBinary('15', 10)).toBe('1111')
  })
  test('十进制转为八进制', () => {
    expect(toOctal('15', 10)).toBe('17')
  })
  test('十进制转为16进制', () => {
    expect(toHex('15', 10)).toBe('f')
  })
})
