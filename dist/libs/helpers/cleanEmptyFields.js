"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.cleanEmptyFields = void 0;
// No se usa en ningun lado
var cleanEmptyFields = function (args) {
    var data = Object.entries(args).filter(function (_a) {
        var _ = _a[0], value = _a[1];
        return value;
    });
    return data.reduce(function (memo, next) {
        var _a;
        return (__assign(__assign({}, memo), (_a = {}, _a[next[0]] = next[1], _a)));
    }, {});
};
exports.cleanEmptyFields = cleanEmptyFields;
