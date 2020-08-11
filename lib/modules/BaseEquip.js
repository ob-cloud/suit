"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEquip = void 0;
var suiter_1 = require("../utils/suiter");
var typeHints_1 = require("../utils/typeHints");
var converter_1 = require("../utils/converter");
var BaseEquip = /** @class */ (function () {
    function BaseEquip() {
        this.Suiter = {};
        this.SuitStatus = {};
        this.SuitTypes = {};
        this.TypeHints = {};
        this.Converter = null;
        this.Suiter = suiter_1.default;
        this.SuitStatus = suiter_1.SuitStatus;
        this.SuitTypes = suiter_1.SuitTypes;
        this.TypeHints = typeHints_1.default;
        this.Converter = converter_1.Converter;
    }
    BaseEquip.prototype.getPrimaryStatusCode = function (mainDevType, status) {
        if (!mainDevType || !status) {
            console.warn('primary device type or status can not be empty!');
            return '';
        }
        return "" + mainDevType + status;
    };
    BaseEquip.prototype.getSecondaryStatusCode = function (mainDevType, secondarySubType, status) {
        if (!mainDevType || !secondarySubType || !status) {
            console.warn('device type or status can not be empty!');
            return '';
        }
        return "" + mainDevType + secondarySubType + status;
    };
    BaseEquip.prototype.getDescriptorByCode = function (code) {
        if (!code)
            console.warn('key code can not be empty!');
        return this.SuitStatus[code];
    };
    BaseEquip.prototype.getMainDescriptor = function (mainDevType, code) {
        return this.getDescriptorByCode(this.getPrimaryStatusCode(mainDevType, code));
    };
    BaseEquip.prototype.getDescriptors = function (mainDevType, statusBitStr, separator) {
        if (separator === void 0) { separator = ','; }
        var descriptor = [];
        for (var i = statusBitStr.length; i > 0; i -= 2) {
            var statusBit = statusBitStr.slice(i - 2, i);
            descriptor.push(this.getDescriptorByCode(this.getPrimaryStatusCode(mainDevType, statusBit)));
        }
        return descriptor.join(separator);
    };
    return BaseEquip;
}());
exports.BaseEquip = BaseEquip;
