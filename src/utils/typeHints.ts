import Suiter from './suiter';

class TypeHints {
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
  public __hasNormalType(
    suitTypes: object,
    mainType: string,
    subType: string
  ): boolean {
    if (!suitTypes) { return false; }
    if (!subType) { return !!suitTypes[mainType]; }
    return !!suitTypes[`${mainType}${subType}`];
  }

  /**
   * 是否是分组设备类型
   * @param group 分组设备类型
   * @param subType 子类型
   */
  public __hasGroupType(group, subType) {
    if (!group || !group.length) { return false; }
    return group.includes(subType);
  }

  public __normalTypeProcessor() {
    Array.from(Object.keys(Suiter)).map(item => {
      const normalTypes = Suiter[item].type; // ==> Suiter['led'].type
      const capital = item.toCapital();
      this[`is${capital}`] = (
        deviceType: string,
        deviceSubType: string
      ): boolean => {
        return this.__hasNormalType(normalTypes, deviceType, deviceSubType);
      };
    });
  }

  public __groupTypeProcessor() {
    Array.from(Object.keys(Suiter)).map(item => {
      const group = Suiter[item].group;
      const statusLength = Suiter[item].statusLength;
      const mainType = item.toCapital();
      if (group) {
        Array.from(Object.keys(group)).map(key => {
          const camel = key.toCapital();
          this[`is${camel}${mainType}`] = (deviceSubType): boolean => {
            return this.__hasGroupType(group[camel], deviceSubType);
          };
        });
      }
    });
  }
  public __statusLengthProcessor() {
    Array.from(Object.keys(Suiter)).map(item => {
      const statusLength = Suiter[item].statusLength;
      const mainType = item.toCapital();
      if (statusLength) {
        this[`get${mainType}BitLen`] = (deviceSubType): number => {
          return statusLength[deviceSubType] || 8;
        };
      }
    });
  }
}

export default new TypeHints();
