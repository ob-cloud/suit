declare class TypeHints {
    constructor();
    /**
     * 判断是否存在指定设备类型
     * @param suitTypes 类型对象, eg: {'01': '灯',...}
     * @param mainType 主类型
     * @param subType  子类型
     */
    __hasNormalType(suitTypes: object, mainType: string, subType: string): boolean;
    /**
     * 是否是分组设备类型
     * @param group 分组设备类型
     * @param subType 子类型
     */
    __hasGroupType(group: any, subType: any): any;
    __normalTypeProcessor(): void;
    __groupTypeProcessor(): void;
    __statusLengthProcessor(): void;
}
declare const _default: TypeHints;
export default _default;
