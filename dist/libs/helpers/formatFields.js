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
exports.formatFields = void 0;
var formatFields = function (_a) {
    var params = _a.params, _b = _a.sep, sep = _b === void 0 ? ',' : _b, label = _a.label;
    var fields = params.split(sep);
    return fields === null || fields === void 0 ? void 0 : fields.reduce(function (store, next) {
        var _a;
        return (__assign(__assign({}, store), (_a = {}, _a[next] = label, _a)));
    }, {});
    // Return undefined or object 
};
exports.formatFields = formatFields;
