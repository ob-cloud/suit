import { Converter } from './converter';
import './string';
import Suit from './suiter';
const Suiter: any = Suit;

/**
 * 类型检测器
 */
export class _TypeHints {
  readonly [x: string]: any;
  constructor() {
    this.__normalTypeProcessor();
    this.__groupTypeProcessor();
    this.__typeIndexPocessor()
    this.__statusLengthProcessor();
  }

  /**
   * 判断是否存在指定设备类型
   * @param suitTypes 类型对象, eg: {'01': '灯',...}
   * @param mainType 主类型
   * @param subType  子类型
   */
  private __hasNormalType(
    suitTypes: object,
    mainType: string,
    subType: string
  ): boolean {
    if (!suitTypes) {
      return false;
    }
    if (!subType) {
      return !!(suitTypes as any)[mainType.toHexNumber().toEvenHex()];
    }
    return !!(suitTypes as any)[`${mainType.toHexNumber().toEvenHex()}${subType.toHexNumber().toEvenHex()}`];
  }

  /**
   * 是否是分组设备类型
   * @param group 分组设备类型
   * @param subType 子类型
   */
  private __hasGroupType(group: string, subType: string): boolean {
    if (!group || !group.length || !subType) {
      return false;
    }
    return group.includes(subType.toHexNumber().toEvenHex());
  }
  /**
   * 获取设备类型
   * @param typeIndex 类型索引对象
   * @param deviceType 设备类型
   * @param deviceChildType 设备子类型
   */
  private __getTypeIndex(typeIndex: object, deviceType: string, deviceChildType: string): string {
    return (typeIndex as any)[`${deviceType.toHexNumber().toEvenHex()}${deviceChildType.toHexNumber().toEvenHex()}`]
  }

  /**
   * 设备类型判断处理器
   * led  ===> isLed(deviceType, deviceSubType)
   */
  private __normalTypeProcessor(): any {
    Array.from(Object.keys(Suiter)).map(item => {
      const normalTypes = Suiter[item].type; // ==> Suiter['led'].type
      const capital = item.toCapital();
      (this as any)[`is${capital}`] = (
        deviceType: string,
        deviceSubType: string
      ): boolean => {
        return this.__hasNormalType(normalTypes, deviceType, deviceSubType);
      };
    });
  }

  /**
   * 分组设备类型判断处理器
   * led: {group: {simple}} --> isSimpleLed(deviceSubType)
   */
  private __groupTypeProcessor(): any {
    Array.from(Object.keys(Suiter)).map(item => {
      const group = Suiter[item].group;
      const typeValue = new Converter(Object.keys(Suiter[item].type)[0] || '0', 10).toHex()
      const mainType = item.toCapital();
      if (group) {
        Array.from(Object.keys(group)).map(key => {
          const camel = key.toCapital();
          (this as any)[`is${camel}${mainType}`] = (
            deviceSubType: string,
            deviceType?: string
          ): boolean => {
            if (deviceType && deviceType !== typeValue) return false
            return this.__hasGroupType(group[key], deviceSubType);
          };
        });
      }
    });
  }
  /**
   * 设备类型索引类型，用于界面按键数显示
   * 获取当天设备按键组合值: 一键开关 -> 1
   *
   * 1路开关(0421): getSocketSwitchTypeIndex(04, 21) => 1
   */
  private __typeIndexPocessor(): any {
    Array.from(Object.keys(Suiter)).map(item => {
      const typeIndex = Suiter[item].typeIndex; // {'0401': '1'}
      const mainType = item.toCapital();
      if (typeIndex) {
        (this as any)[`get${mainType}TypeIndex`] = (
          deviceType: string,
          deviceChildType: string
        ): string => {
          return this.__getTypeIndex(typeIndex, deviceType, deviceChildType);
        };
      }
    });
  }
  private __statusLengthProcessor(): any {
    Array.from(Object.keys(Suiter)).map(item => {
      const statusLength = Suiter[item].statusLength;
      const mainType = item.toCapital();
      if (statusLength) {
        (this as any)[`get${mainType}BitLen`] = (
          deviceSubType: string
        ): number => {
          return statusLength[deviceSubType] || 8;
        };
      }
    });
  }
}

/**
 * {@link _TypeHints}
 */
export const TypeHints = new _TypeHints();
