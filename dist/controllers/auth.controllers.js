"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.loginWithToken = exports.toLogin = exports.toRegister = void 0;
var client_1 = require("@prisma/client");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var Bcrypt_1 = require("../libs/helpers/Bcrypt");
var InfoResponse_1 = require("../libs/InfoResponse");
var Models_1 = require("../models/Models");
var _a = process.env, timeToken = _a.timeToken, SECRET_KEY = _a.SECRET_KEY;
var prisma = new client_1.PrismaClient({ errorFormat: 'minimal' }).user;
var toRegister = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, username, email, password, user, id, role, token, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, username = _a.username, email = _a.email;
                password = req.body.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                password = (0, Bcrypt_1.encryptData)(password);
                return [4 /*yield*/, prisma.create({
                        data: {
                            name: name,
                            username: username,
                            email: email,
                            password: password
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
            case 2:
                user = _b.sent();
                id = user.id, role = user.role;
                token = jsonwebtoken_1["default"].sign({ id: id, email: email, role: role }, SECRET_KEY, { expiresIn: timeToken }) // Para el tiempo usa el package: 'ms'
                ;
                user = new Models_1.User(user);
                // ### Return the token
                return [2 /*return*/, res.status(200).json({
                        msg: 'Succesful. User Created',
                        user: user,
                        token: token
                    })];
            case 3:
                error_1 = _b.sent();
                if (typeof error_1 === 'string') { // Password not provided
                    InfoResponse_1.Info.setData(500, { error: error_1, token: null });
                }
                else {
                    InfoResponse_1.Info.setPrismaError(500, error_1);
                }
                InfoResponse_1.Info.setResponse(res);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.toRegister = toRegister;
var toLogin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, isValid, id, role, token, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body // Get the email and password
                , email = _a.email, password = _a.password;
                if (!password)
                    return [2 /*return*/, res.status(400).json({
                            msg: 'The password is required',
                            token: null
                        })];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.findUnique({
                        where: { email: email },
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
                user = _b.sent();
                if (!user)
                    throw "The user '".concat(email, "' does not exist");
                isValid = (0, Bcrypt_1.compareData)(password, user.password);
                if (!isValid)
                    return [2 /*return*/, res.status(401).json({ msg: 'Invalid Password' })]; // 401. unauthorized
                id = user // ### Get the id
                .id, role = user // ### Get the id
                .role;
                token = jsonwebtoken_1["default"].sign({ id: id, email: email, role: role }, SECRET_KEY, { expiresIn: timeToken });
                user = new Models_1.User(user);
                return [2 /*return*/, res.status(200).json({
                        msg: 'Succesful. User logged',
                        user: user,
                        token: token
                    })];
            case 3:
                error_2 = _b.sent();
                InfoResponse_1.Info.setData(500, { error: error_2 });
                InfoResponse_1.Info.setResponse(res);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.toLogin = toLogin;
var loginWithToken = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.userSession.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.findUnique({
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
                user = new Models_1.User(user);
                return [2 /*return*/, res.status(200).json({
                        msg: 'Succesful',
                        user: user
                    })];
            case 3:
                error_3 = _a.sent();
                InfoResponse_1.Info.setData(500, { error: error_3 });
                InfoResponse_1.Info.setResponse(res);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.loginWithToken = loginWithToken;
