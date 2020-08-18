import Suit from './suiter';
const Suiter: any = Suit;
class _TypeHints {
  constructor() {
    this.__normalTypeProcessor();
    this.__groupTypeProcessor();
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
      return !!(suitTypes as any)[mainType];
    }
    return !!(suitTypes as any)[`${mainType}${subType}`];
  }

  /**
   * 是否是分组设备类型
   * @param group 分组设备类型
   * @param subType 子类型
   */
  private __hasGroupType(group: string, subType: string) {
    if (!group || !group.length) {
      return false;
    }
    return group.includes(subType);
  }

  private __normalTypeProcessor():any {
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

  private __groupTypeProcessor():any {
    Array.from(Object.keys(Suiter)).map(item => {
      const group = Suiter[item].group;
      const mainType = item.toCapital();
      if (group) {
        Array.from(Object.keys(group)).map(key => {
          const camel = key.toCapital();
          (this as any)[`is${camel}${mainType}`] = (
            deviceSubType: string
          ): boolean => {
            return this.__hasGroupType(group[camel], deviceSubType);
          };
        });
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

export const TypeHints = new _TypeHints();
