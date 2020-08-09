"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var suiter_1 = require("./suiter");
var TypeHints = /** @class */ (function () {
    function TypeHints() {
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
    TypeHints.prototype.__hasNormalType = function (suitTypes, mainType, subType) {
        if (!suitTypes)
            return false;
        if (!subType)
            return !!suitTypes[mainType];
        return !!suitTypes["" + mainType + subType];
    };
    /**
     * 是否是分组设备类型
     * @param group 分组设备类型
     * @param subType 子类型
     */
    TypeHints.prototype.__hasGroupType = function (group, subType) {
        if (!group || !group.length)
            return false;
        return group.includes(subType);
    };
    TypeHints.prototype.__normalTypeProcessor = function () {
        var _this = this;
        Array.from(Object.keys(suiter_1.default)).map(function (item) {
            var normalTypes = suiter_1.default[item].type; // ==> Suiter['led'].type
            var capital = item.toCapital();
            _this["is" + capital] = function (deviceType, deviceSubType) {
                return _this.__hasNormalType(normalTypes, deviceType, deviceSubType);
            };
        });
    };
    TypeHints.prototype.__groupTypeProcessor = function () {
        var _this = this;
        Array.from(Object.keys(suiter_1.default)).map(function (item) {
            var group = suiter_1.default[item].group;
            var statusLength = suiter_1.default[item].statusLength;
            var mainType = item.toCapital();
            if (group) {
                Array.from(Object.keys(group)).map(function (key) {
                    var camel = key.toCapital();
                    _this["is" + camel + mainType] = function (deviceSubType) {
                        return _this.__hasGroupType(group[camel], deviceSubType);
                    };
                });
            }
        });
    };
    TypeHints.prototype.__statusLengthProcessor = function () {
        var _this = this;
        Array.from(Object.keys(suiter_1.default)).map(function (item) {
            var statusLength = suiter_1.default[item].statusLength;
            var mainType = item.toCapital();
            if (statusLength) {
                _this["get" + mainType + "BitLen"] = function (deviceSubType) {
                    return statusLength[deviceSubType] || 8;
                };
            }
        });
    };
    return TypeHints;
}());
exports.default = new TypeHints();
