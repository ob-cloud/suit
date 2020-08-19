import { Converter, fillLength } from './converter';
import { TypeHints } from './typeHints';
import Suiter, { SuitStatus, SuitTypes } from '../utils/suiter';
import { LampStatus } from '../entity/LampStatus';
import { SensorStatus } from '../entity/SensorStatus';
import { SocketStatus } from '../entity/SocketStatus';

/**
 * 状态描述器
 */
class _Descriptor {
  public readonly Suiter = {};
  public readonly SuitStatus = {};
  public readonly SuitTypes = {};
  public readonly TypeHints = {};
  public readonly Converter = {};
  constructor() {
    this.Suiter = Suiter;
    this.SuitStatus = SuitStatus;
    this.SuitTypes = SuitTypes;
    this.TypeHints = TypeHints;
    this.Converter = Converter;
  }

  /**
   * 获取设备类型码
   * @param deviceType 设备主类型
   * @param deviceChildType 设备子类型
   */
  public getEquipTypeCode(deviceType: string, deviceChildType?: string): string {
    if (!deviceType) {
      console.warn('device type can not be empty!');
      return '';
    }
    return deviceChildType
      ? `${deviceType}${deviceChildType}`
      : `${deviceType}`;
  }

  /**
   * 获取设备类型描述
   * @param deviceType 设备主类型
   * @param deviceChildType 设备子类型
   */
  public getEquipTypeDescriptor(deviceType: string, deviceChildType: string): string {
    const type = this.getEquipTypeCode(deviceType, deviceChildType);
    return (this.SuitTypes as any)[type];
  }

  /**
   * 获取主设备状态码
   * @param deviceType 主设备类型
   * @param status 状态码 - 如 01（一个字节）
   */
  public getPrimaryStatusCode(deviceType: string, status: string): string {
    if (!deviceType || !status) {
      console.warn('primary device type or status can not be empty!');
      return '';
    }
    return `${deviceType}${status}`;
  }

  /**
   *
   * @param deviceType 设备主类型
   * @param deviceChildType 设备子类型
   * @param status 状态码 - 01
   */
  public getSecondaryStatusCode(
    deviceType: string,
    deviceChildType: string,
    status: string
  ): string {
    if (!deviceType || !deviceChildType || !status) {
      console.warn('device type or status can not be empty!');
      return '';
    }
    return `${deviceType}${deviceChildType}${status}`;
  }

  /**
   * 根据状态码获取设备描述
   * @param code 状态码
   */
  public getDescriptorByCode(code: string): string {
    if (!code) {
      console.warn('key code can not be empty!');
    }
    return (this.SuitStatus as any)[code];
  }

  /**
   * 获取设备主类型状态描述
   * @param deviceType 设备主类型
   * @param code 状态码
   */
  public getMainDescriptor(deviceType: string, code: string): string {
    return this.getDescriptorByCode(
      this.getPrimaryStatusCode(deviceType, code)
    );
  }
  public getDescriptors(
    deviceType: string,
    statusBitStr: string,
    separator: string = ','
  ): string {
    const descriptor: any[] = [];
    for (let i = statusBitStr.length; i > 0; i -= 2) {
      const statusBit = statusBitStr.slice(i - 2, i);
      descriptor.push(
        this.getDescriptorByCode(
          this.getPrimaryStatusCode(deviceType, statusBit)
        )
      );
    }
    return descriptor.join(separator);
  }

  /**
   * 获取开关状态描述
   * @param status 状态码 16位字符串
   * @param deviceType 设备主类型
   * @param deviceChildType 设备子类型
   */
  public getSwitchDescriptor(
    status: string,
    deviceType: string,
    deviceChildType?: string
  ): string {
    const socketStatus = new SocketStatus(status);
    if (!deviceChildType) {
      return this.getMainDescriptor(deviceType, socketStatus.getState());
    }

    const TypeHints = this.TypeHints as any;
    const bitlen = TypeHints.getSocketSwitchLen(deviceChildType);

    if (TypeHints.isPlugSocketSwitch(deviceChildType)) {
      const statusBitStr = fillLength(socketStatus.getPlugStatus(), bitlen);
      return this.getDescriptors(deviceType, statusBitStr);
    }
    if (TypeHints.isTouchSocketSwitch(deviceChildType)) {
      const statusBitStr = fillLength(socketStatus.getTouchStatus(), bitlen);
      return this.getDescriptors(deviceType, statusBitStr);
    }
    if (TypeHints.isNormalSocketSwitch(deviceChildType)) {
      const statusBitStr = fillLength(socketStatus.getTouchStatus(), bitlen);
      return this.getDescriptors(deviceType, statusBitStr);
    }
    if (TypeHints.isMixSocketSwitch(deviceChildType)) {
      const statusBitStr = fillLength(socketStatus.getMixupStatus(), bitlen);
      return this.getDescriptors(deviceType, statusBitStr);
    }
    if (TypeHints.isSceneSocketSwitch(deviceChildType)) {
      const statusBitStr = fillLength(socketStatus.getSceneStatus(), bitlen);
      return this.getDescriptors(deviceType, statusBitStr);
    }
    return '';
  }

  /**
   * 获取灯状态描述
   * @param status 状态
   * @param deviceType 设备主类型
   * @param deviceChildType 设备子类型
   */
  public getLampDescriptor(
    status: string,
    deviceType: string,
    deviceChildType: string
  ) {
    const lampStatus = new LampStatus(status);
    if (!deviceChildType) {
      return this.getMainDescriptor(
        deviceType,
        lampStatus.getNormalLampStatus()
      );
    }
    const TypeHints = this.TypeHints as any;
    const Converter = this.Converter as any;
    if (TypeHints.isSimpleLed(deviceChildType)) {
      const normalStatus = lampStatus.getNormalLampStatus();
      const converter = new Converter(normalStatus, 16);
      return normalStatus === '00'
        ? '关'
        : normalStatus === 'ff'
        ? '开'
        : `亮度${converter.toDecimal(normalStatus)}`;
    }
    if (TypeHints.isColorLed(deviceChildType)) {
      const brightStatus = lampStatus.getNormalLampStatus();
      const colorStatus = lampStatus.getColorLampStatus();
      const isPowerOn = brightStatus !== '00';
      const brightValue = new Converter(brightStatus, 16).toDecimal(
        brightStatus
      );
      const colorValue = new Converter(colorStatus, 16).toDecimal(brightStatus);

      return isPowerOn ? `亮度:${brightValue}-冷色:${colorValue}` : '关';
    }
    return '';
  }
  public getSensorDescriptor(
    status: string,
    deviceType: string,
    deviceChildType: string
  ): string {
    const sensorStatus = new SensorStatus(status);
    if (!deviceChildType) {
      return this.getMainDescriptor(
        deviceType,
        sensorStatus.getSensorRootStatus()
      );
    }

    return '';
  }
}

export const Descriptor = new _Descriptor();
