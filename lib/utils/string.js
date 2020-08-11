"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
String.prototype.toCapital = function () {
    return this.slice(0, 1).toUpperCase() + this.slice(1);
};
String.prototype.toLower = function () {
    return this.slice(0, 1).toLowerCase() + this.slice(1);
};
String.prototype.format = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (arguments.length === 0)
        return this;
    var s = this;
    for (var i = 0; i < arguments.length; i++)
        s = s.replace(new RegExp('\\{' + i + '\\}', 'g'), arguments[i]);
    return s;
};
exports.default = String;
