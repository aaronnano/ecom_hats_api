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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.deleteUserAddress = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = void 0;
var client_1 = require("@prisma/client");
var InfoResponse_1 = require("../libs/InfoResponse");
var Bcrypt_1 = require("../libs/helpers/Bcrypt");
var Models_1 = require("../models/Models");
var prismaUser = new client_1.PrismaClient({ errorFormat: 'minimal' }).user;
var prismaAdress = new client_1.PrismaClient({ errorFormat: 'minimal' }).userAddress;
var getUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params // Get: Get User by id
                .id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prismaUser.findUnique({
                        where: { id: Number(id) },
                        include: {
                            addresses: true,
                            orders: {
                                include: {
                                    delivery_address: true,
                                    orderItems: {
                                        include: {
                                            color: true,
                                            product: true
                                        }
                                    }
                                }
                            }
                        }
                    })];
            case 2:
                user = _a.sent();
                if (!user)
                    throw "The user: ".concat(id, " does not exist");
                user = new Models_1.User(user);
                InfoResponse_1.Info.setData(201, {
                    msg: 'Succesful.',
                    user: user
                });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                if (typeof error_1 === 'string') { // My custom errors
                    InfoResponse_1.Info.setData(500, { error: error_1 });
                }
                else {
                    InfoResponse_1.Info.setPrismaError(500, error_1); // Every Prisma error. Por las dudas
                }
                return [3 /*break*/, 4];
            case 4:
                InfoResponse_1.Info.setResponse(res);
                return [2 /*return*/];
        }
    });
}); };
exports.getUser = getUser;
var createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, username, email, _b, password, role, user, error_2;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, name = _a.name, username = _a.username, email = _a.email;
                _b = req.body, password = _b.password, role = _b.role;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                password = (0, Bcrypt_1.encryptData)(password);
                role = role.toUpperCase();
                return [4 /*yield*/, prismaUser.create({
                        data: {
                            username: username,
                            name: name,
                            email: email,
                            password: password,
                            role: role
                        }
                    })];
            case 2:
                user = _c.sent();
                InfoResponse_1.Info.setData(201, {
                    msg: "User created.",
                    user: user
                });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _c.sent();
                if (typeof error_2 === 'string') { // Password not provided
                    InfoResponse_1.Info.setData(500, { error: error_2 });
                }
                else {
                    InfoResponse_1.Info.setPrismaError(500, error_2);
                }
                return [3 /*break*/, 4];
            case 4:
                InfoResponse_1.Info.setResponse(res);
                return [2 /*return*/];
        }
    });
}); };
exports.createUser = createUser;
var updateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, name, username, email, role, avatar, _b, password, address, newAddress, user, error_3;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                id = req.params.id;
                _a = req.body, name = _a.name, username = _a.username, email = _a.email, role = _a.role, avatar = _a.avatar;
                _b = req.body, password = _b.password, address = _b.address;
                console.log({ address: address });
                _c.label = 1;
            case 1:
                _c.trys.push([1, 7, , 8]);
                password = password ? (0, Bcrypt_1.encryptData)(password) : undefined;
                newAddress = void 0;
                if (!(address === null || address === void 0 ? void 0 : address.id)) return [3 /*break*/, 3];
                return [4 /*yield*/, prismaAdress.update({
                        where: {
                            id: address.id
                        },
                        data: __assign({}, address)
                    })];
            case 2:
                newAddress = _c.sent();
                return [3 /*break*/, 5];
            case 3:
                if (!address) return [3 /*break*/, 5];
                return [4 /*yield*/, prismaAdress.create({
                        data: __assign(__assign({}, address), { userId: Number(id) })
                    })];
            case 4:
                newAddress = _c.sent();
                _c.label = 5;
            case 5: return [4 /*yield*/, prismaUser.update({
                    where: {
                        id: Number(id)
                    },
                    data: {
                        username: username,
                        name: name,
                        email: email,
                        password: password,
                        role: role,
                        avatar: avatar
                    },
                    include: {
                        addresses: true,
                        orders: {
                            include: {
                                delivery_address: true,
                                orderItems: {
                                    include: {
                                        color: true,
                                        product: true
                                    }
                                }
                            }
                        }
                    }
                })];
            case 6:
                user = _c.sent();
                user = new Models_1.User(user);
                InfoResponse_1.Info.setData(201, {
                    msg: "User updated.",
                    user: user
                });
                return [3 /*break*/, 8];
            case 7:
                error_3 = _c.sent();
                InfoResponse_1.Info.setPrismaError(500, error_3);
                return [3 /*break*/, 8];
            case 8:
                InfoResponse_1.Info.setResponse(res);
                return [2 /*return*/];
        }
    });
}); };
exports.updateUser = updateUser;
var deleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, deletedUser, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prismaUser["delete"]({
                        where: {
                            id: Number(id)
                        }
                    })];
            case 2:
                deletedUser = _a.sent();
                InfoResponse_1.Info.setData(201, {
                    msg: "User deleted.",
                    deletedUser: deletedUser
                });
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                InfoResponse_1.Info.setPrismaError(500, error_4);
                return [3 /*break*/, 4];
            case 4:
                InfoResponse_1.Info.setResponse(res);
                return [2 /*return*/];
        }
    });
}); };
exports.deleteUser = deleteUser;
var deleteUserAddress = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, addressId, address, user, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params, id = _a.id, addressId = _a.addressId;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, prismaAdress["delete"]({
                        where: {
                            id: Number(addressId)
                        }
                    })];
            case 2:
                address = _b.sent();
                return [4 /*yield*/, prismaUser.findUnique({
                        where: { id: Number(id) },
                        include: {
                            addresses: true
                        }
                    })];
            case 3:
                user = _b.sent();
                if (!user)
                    throw "The user: ".concat(id, " does not exist");
                user = new Models_1.User(user);
                InfoResponse_1.Info.setData(201, {
                    msg: "Address Deleted.",
                    user: user
                });
                return [3 /*break*/, 5];
            case 4:
                error_5 = _b.sent();
                InfoResponse_1.Info.setPrismaError(500, error_5);
                return [3 /*break*/, 5];
            case 5:
                InfoResponse_1.Info.setResponse(res);
                return [2 /*return*/];
        }
    });
}); };
exports.deleteUserAddress = deleteUserAddress;
