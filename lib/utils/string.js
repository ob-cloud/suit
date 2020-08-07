"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
String.prototype.toCapital = function () {
    return _this.slice(0, 1).toUpperCase() + _this.slice(1);
};
String.prototype.toLower = function () {
    return _this.slice(0, 1).toLowerCase() + _this.slice(1);
};
exports.default = String;
