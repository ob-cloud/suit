import { Converter, fillLength } from './converter';
import { TypeHints } from './typeHints';
import Suiter, { SuitStatus, SuitTypes } from '../utils/suiter';
import { LampStatus } from '../entity/LampStatus';
import { SensorStatus } from '../entity/sensor/SensorStatus';
import { SocketStatus } from '../entity/SocketStatus';
import { CardPowerEquip } from '../modules/CardPowerEquip';
import { SwitchMixEquip } from '../modules/SwitchMixEquip';
import { CurtainEquip } from '../modules/CurtainEquip';

/**
 * 状态描述器
 */
export class _Descriptor {
  readonly [x: string]: any;
  public readonly Suiter = {};
  public readonly SuitStatus = {};
  public readonly SuitTypes = {};
  public readonly TypeHints: typeof TypeHints;
  public readonly Converter: typeof Converter;
  constructor() {
    this.Suiter = Suiter;
    this.SuitStatus = SuitStatus;
    this.SuitTypes = SuitTypes;
    this.TypeHints = TypeHints;
    this.Converter = Converter;
  }

  private _adaptHex(hex: string): string {
    return hex.length > 1 ? hex : `0${hex}`;
  }

  /**
   * 获取设备类型码
   * @param deviceType 设备主类型
   * @param deviceChildType 设备子类型
   */
  public getEquipTypeCode(
    deviceType: string,
    deviceChildType?: string
  ): string {
    if (!deviceType) {
      console.warn('device type can not be empty!');
      return '';
    }
    return deviceChildType
      ? `${deviceType.toHexNumber().toEvenHex()}${deviceChildType.toHexNumber().toEvenHex()}`
      : `${deviceType.toHexNumber().toEvenHex()}`;
  }

  /**
   * 获取设备类型描述
   * @param deviceType 设备主类型
   * @param deviceChildType 设备子类型
   */
  public getEquipTypeDescriptor(
    deviceType: string,
    deviceChildType: string
  ): string {
    const type = this.getEquipTypeCode(deviceType, deviceChildType);
    return (this.SuitTypes as any)[type];
  }

  /**
   * @see {getEquipTypeDescriptor}
   * @param deviceType
   * @param deviceChildType
   */
  public getTypeDescriptor (deviceType: string, deviceChildType: string): string {
    return this. getEquipTypeDescriptor(deviceType, deviceChildType)
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
    return `${deviceType.toHexNumber().toEvenHex()}${status.toEvenHex()}`;
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
    return `${deviceType.toHexNumber().toEvenHex()}${deviceChildType.toHexNumber().toEvenHex()}${status.toEvenHex()}`;
  }

  /**
   * 根据状态码获取设备描述
   * @param code 状态码
   */
  public getDescriptorByCode(code: string): string {
    if (!code) {
      console.warn('key code can not be empty!');
    }
    return (this.SuitStatus as any)[code.toEvenHex()];
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
   * TODO 获取开关状态描述
   * @param status 状态码 16位字符串
   * @param deviceType 设备主类型
   * @param deviceChildType 设备子类型
   */
  public getSocketSwitchDescriptor(
    status: string,
    deviceType: string,
    deviceChildType?: string
  ): string {
    const socketStatus = new SocketStatus(status);
    if (!deviceChildType) {
      return this.getMainDescriptor(deviceType, socketStatus.getState());
    }

    const TypeHints = this.TypeHints as any;
    const bitlen = TypeHints.getSocketSwitchBitLen(deviceChildType);

    if (TypeHints.isPlugSocketSwitch(deviceChildType)) {
      const statusBitStr = fillLength(socketStatus.getPlugStatus(), bitlen);
      return this.getDescriptors(deviceType, statusBitStr);
    }
    // if (TypeHints.isTouchSocketSwitch(deviceChildType)) {
    //   const statusBitStr = fillLength(socketStatus.getTouchStatus(), bitlen);
    //   return this.getDescriptors(deviceType, statusBitStr);
    // }
    // if (TypeHints.isNormalSocketSwitch(deviceChildType)) {
    //   const statusBitStr = fillLength(socketStatus.getTouchStatus(), bitlen);
    //   return this.getDescriptors(deviceType, statusBitStr);
    // }
    // if (TypeHints.isMixSocketSwitch(deviceChildType)) {
    //   const statusBitStr = fillLength(socketStatus.getMixupStatus(), bitlen);
    //   return this.getDescriptors(deviceType, statusBitStr);
    // }
    // if (TypeHints.isSceneSocketSwitch(deviceChildType)) {
    //   const statusBitStr = fillLength(socketStatus.getSceneStatus(), bitlen);
    //   return this.getDescriptors(deviceType, statusBitStr);
    // }
    // if (TypeHints.isXkeySocketSwitch(deviceChildType)) {
    //   return socketStatus.getTouchStatus() === '00' ? '关' : '开'
    // }
    // console.log('deviceChildType === ', deviceChildType, TypeHints.isXkeySocketSwitch(deviceChildType, deviceType))
    if (TypeHints.isXkeySocketSwitch(deviceChildType, deviceType)) {
      // return socketStatus.getTouchStatus() === '00' ? '关' : '开'
      const equip = new SwitchMixEquip(status, deviceType, deviceChildType)
      return equip.getStatusDescriptor()
    }
    return '';
  }

  /**
   * 获取窗帘状态描述
   * @param status 状态码 16位字符串
   * @param deviceType 设备主类型
   * @param deviceChildType 设备子类型
   */
  public getSmartSwitchDescriptor (status: string, deviceType: string, deviceChildType?: string): string {
    const TypeHints = this.TypeHints as any;
    if (TypeHints.isCurtainSmartSwitch(deviceChildType, deviceType)) {
      const curtain = new CurtainEquip(status, deviceType, deviceChildType)
      return curtain.getStatusDescriptor()
    }
    return ''
  }

  /**
   * 获取灯状态描述
   * @param status 状态
   * @param deviceType 设备主类型
   * @param deviceChildType 设备子类型
   */
  public getLedDescriptor(
    status: string,
    deviceType: string,
    deviceChildType: string,
    short: boolean = true
  ): string {
    const lampStatus = new LampStatus(status);
    if (!deviceChildType) {
      return this.getMainDescriptor(
        deviceType,
        lampStatus.getBrightnessStatus()
      );
    }
    const TypeHints = this.TypeHints as any;
    const Converter = this.Converter as any;
    if (TypeHints.isSimpleLed(deviceChildType)) {
      const normalStatus = lampStatus.getBrightnessStatus();
      const converter = new Converter(normalStatus, 16);
      return normalStatus === '00'
        ? '关'
        : normalStatus === 'ff'
        ? '开'
        : short ? '开' : `亮度${converter.toDecimal(normalStatus)}`;
    }
    if (TypeHints.isColorLed(deviceChildType)) {
      const brightStatus = lampStatus.getBrightnessStatus();
      const colorStatus = lampStatus.getColdColorStatus();
      const isPowerOn = brightStatus !== '00';
      const brightValue = new Converter(brightStatus, 16).toDecimal();
      const colorValue = new Converter(colorStatus, 16).toDecimal();

      return isPowerOn ? `亮度:${brightValue}-冷色:${colorValue}` : '关';
    }
    return '';
  }
  public getSensorsDescriptor(
    status: string,
    deviceType: string,
    deviceChildType: string
  ): string {
    if (!deviceChildType) {
      const sensorStatus = new SensorStatus(status);
      return this.getMainDescriptor(
        deviceType,
        sensorStatus.getSensorNormalStatus()
      );
    }
    const TypeHints = this.TypeHints as any;
    if (TypeHints.isPluginPowerSensors(deviceChildType, deviceType)) {
      const cardPowerEquip = new CardPowerEquip(status, deviceType, deviceChildType)
      return cardPowerEquip.getStatusDescriptor()
    }
    return '';
  }

  /**
   * 获取设备状态描述
   * @param status 状态 16位字符串
   * @param deviceType 设备类型
   * @param deviceChildType 设备子类型
   */
  public getStatusDescriptor (status: string, deviceType: string, deviceChildType: string): string {

    const deviceTypeKey = Array.from(Object.keys(this.Suiter)).find(suitKey => {
      const suitKeyCapital = suitKey.toCapital()
      return this.TypeHints[`is${suitKeyCapital}`].call(this.TypeHints, deviceType, deviceChildType) || '';
    }) || ''
    const statusMethodName = `get${deviceTypeKey.toCapital()}Descriptor`
    if (this[statusMethodName]) {
      return this[statusMethodName].call(this, status, deviceType, deviceChildType)
    }
    return ''
  }
}

/**
 * {@link _Descriptor}
 * 状态描述器
 */
export const Descriptor = new _Descriptor();
