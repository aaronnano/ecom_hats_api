"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.compareData = exports.encryptData = void 0;
var bcryptjs_1 = __importDefault(require("bcryptjs"));
// bcrypt, hasta donde no da detalles de los erroes que lanza
var encryptData = function (data) {
    if (!data)
        throw "El dato a hashear es undefined";
    var salt = bcryptjs_1["default"].genSaltSync();
    return bcryptjs_1["default"].hashSync(data, salt);
};
exports.encryptData = encryptData;
var compareData = function (data, hash) {
    return bcryptjs_1["default"].compareSync(data, hash);
};
exports.compareData = compareData;
