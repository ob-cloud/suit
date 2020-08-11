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
var BaseEquip_1 = require("./BaseEquip");
var SocketEquip = /** @class */ (function (_super) {
    __extends(SocketEquip, _super);
    function SocketEquip(deviceType, deviceSubType, status) {
        var _this = _super.call(this) || this;
        _this.deviceType = '';
        _this.deviceSubType = '';
        _this.status = '';
        _this.deviceType = deviceType;
        _this.deviceSubType = deviceSubType;
        _this.status = status;
        return _this;
    }
    SocketEquip.prototype.getDescriptor = function () {
        if (!this.deviceSubType)
            return this.getMainDescriptor(this.deviceType, this.status);
    };
    return SocketEquip;
}(BaseEquip_1.BaseEquip));
