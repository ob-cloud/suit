"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var LampEquip_1 = require("./LampEquip");
var LedLampEquip = /** @class */ (function (_super) {
    __extends(LedLampEquip, _super);
    function LedLampEquip(status, primaryType, secondaryType) {
        var _this = _super.call(this, status, primaryType, secondaryType) || this;
        _this.brightness = '';
        _this.coldColor = '';
        _this.warmColor = '';
        _this.brightness = _this.status.slice(0, 2);
        _this.coldColor = _this.status.slice(2, 4);
        _this.warmColor = _this.isBicolor() ? 'ff' : '00';
        return _this;
    }
    /**
     * 是否双色灯
     */
    LedLampEquip.prototype.isBicolor = function () {
        return this.coldColor !== '00';
    };
    /**
     * 是否单色灯
     */
    LedLampEquip.prototype.isPlainColor = function () {
        return !this.isBicolor();
    };
    LedLampEquip.prototype.setBrightness = function (value) {
        if (!value || value < 0 || value > 100) {
            console.warn('value should be 0 ~ 100');
            return;
        }
        this.brightness = value === 0 ? '00' : new this.Converter(+value + 154, 10).toHex();
        return this;
    };
    LedLampEquip.prototype.getBrightness = function () {
        var brightness = this.brightness ? new this.Converter(this.brightness, 16).toDecimal() : 0;
        return brightness ? brightness - 154 : 0;
    };
    LedLampEquip.prototype.setColdColor = function (value) {
        if (!value)
            return;
        var coldColor = new this.Converter(255 - Math.round(value * 2.55), 10).toHex();
        this.coldColor = coldColor.length > 10 ? coldColor : "0" + coldColor;
        return this;
    };
    LedLampEquip.prototype.getColdColor = function () {
        var coldColor = this.coldColor ? new this.Converter(this.coldColor, 16).toDecimal() : 0;
        return 100 - Math.round(coldColor / 2.55);
    };
    LedLampEquip.prototype.setWarmColor = function () {
        this.warmColor = this.isBicolor() ? 'ff' : '00';
        return this;
    };
    LedLampEquip.prototype.getWarmColor = function () {
        return this.warmColor;
    };
    LedLampEquip.prototype.getBytes = function () {
        return this.bytes.format(this.brightness, this.coldColor, this.warmColor);
    };
    LedLampEquip.prototype.getTurnOffBytes = function () {
        return this.setBrightness(0).setColdColor(0).setWarmColor().getBytes();
    };
    LedLampEquip.prototype.getTurnOnBytes = function (bright, cold) {
        return this.setBrightness(bright || 100).setColdColor(cold || 0).setWarmColor().getBytes();
    };
    return LedLampEquip;
}(LampEquip_1.LampEquip));
