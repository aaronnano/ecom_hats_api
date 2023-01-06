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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.createOrder = void 0;
var client_1 = require("@prisma/client");
var InfoResponse_1 = require("../libs/InfoResponse");
var Models_1 = require("../models/Models");
var cleanEmptyFields_1 = require("../libs/helpers/cleanEmptyFields");
var prisma = new client_1.PrismaClient({ errorFormat: 'minimal' }).order;
var prismaColor = new client_1.PrismaClient({ errorFormat: 'minimal' }).color;
var prismaCart = new client_1.PrismaClient({ errorFormat: 'minimal' }).cartItem;
var createOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, _a, delivery_addressId, delivery_date, total, orderItems, colors_1, order, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                userId = req.params // Get: Get User by id
                .id;
                _a = req.body, delivery_addressId = _a.delivery_addressId, delivery_date = _a.delivery_date, total = _a.total;
                orderItems = req.body.orderItems;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                colors_1 = orderItems.map(function (_a) {
                    var color = _a.color;
                    return prismaColor.findUnique({
                        where: {
                            title: color
                        }
                    });
                });
                return [4 /*yield*/, Promise.all(__spreadArray([], colors_1, true))];
            case 2:
                colors_1 = _b.sent();
                orderItems = orderItems.map(function (item, i) {
                    item = __assign(__assign({}, item), { colorId: colors_1[i].id, color: undefined });
                    return (0, cleanEmptyFields_1.cleanEmptyFields)(item); // Para que el color: undefined se vaya
                });
                return [4 /*yield*/, prisma.create({
                        data: {
                            delivery_addressId: delivery_addressId,
                            delivery_date: new Date(delivery_date),
                            total: total,
                            userId: Number(userId),
                            orderItems: {
                                create: __spreadArray([], orderItems, true)
                            }
                        },
                        include: {
                            delivery_address: true,
                            orderItems: {
                                include: {
                                    color: true,
                                    product: true
                                }
                            }
                        }
                    })];
            case 3:
                order = _b.sent();
                order = new Models_1.Order(order);
                // Eliminar todo el cart del UserId
                return [4 /*yield*/, prismaCart.deleteMany({
                        where: {
                            userId: Number(userId)
                        }
                    })];
            case 4:
                // Eliminar todo el cart del UserId
                _b.sent();
                InfoResponse_1.Info.setData(201, {
                    msg: "User created.",
                    order: order
                });
                return [3 /*break*/, 6];
            case 5:
                error_1 = _b.sent();
                if (typeof error_1 === 'string') { // Password not provided
                    InfoResponse_1.Info.setData(500, { error: error_1 });
                }
                else {
                    InfoResponse_1.Info.setPrismaError(500, error_1);
                }
                console.log({ error: error_1 });
                return [3 /*break*/, 6];
            case 6:
                InfoResponse_1.Info.setResponse(res);
                return [2 /*return*/];
        }
    });
}); };
exports.createOrder = createOrder;
//# sourceMappingURL=order.controllers.js.map