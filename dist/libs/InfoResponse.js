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
exports.Info = void 0;
var Info = /** @class */ (function () {
    function Info() {
    }
    Info.setData = function (status, args) {
        this.clean();
        this.status = status;
        this.data = args;
    };
    Info.setPrismaError = function (status, error) {
        this.clean();
        this.status = status;
        this.errorMessage = {
            code: error.code, error: error.message
        };
    };
    Info.setResponse = function (res) {
        res.status(this.status).json(__assign(__assign({}, this.data), this.errorMessage));
        this.clean();
    };
    Info.clean = function () {
        this.status = 200;
        this.errorMessage = undefined;
        this.data = undefined;
    };
    Info.status = 200;
    return Info;
}());
exports.Info = Info;
