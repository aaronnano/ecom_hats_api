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
exports.createProduct = exports.getProducts = void 0;
var client_1 = require("@prisma/client");
var InfoResponse_1 = require("../libs/InfoResponse");
var Models_1 = require("../models/Models");
var prisma = new client_1.PrismaClient({ errorFormat: 'minimal' }).product;
var prismaColor = new client_1.PrismaClient({ errorFormat: 'minimal' }).color;
// Seria bueno que en todas las request, se devuelve siempre el Model que requira el Front aunque 
// la request no sea un get
var getProducts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var products, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, prisma.findMany({
                        include: {
                            colors: true,
                            category: true
                        }
                    })];
            case 1:
                products = _a.sent();
                products = products.map(function (product) { return new Models_1.Product(product); }); // Data with proper Model
                InfoResponse_1.Info.setData(201, {
                    msg: 'Succesful.',
                    products: products
                });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                if (typeof error_1 === 'string') { // My custom errors. No hay aun nada
                    InfoResponse_1.Info.setData(500, { error: error_1 });
                }
                else {
                    InfoResponse_1.Info.setPrismaError(500, error_1); // Every Prisma error. Por las dudas
                }
                return [3 /*break*/, 3];
            case 3:
                InfoResponse_1.Info.setResponse(res);
                return [2 /*return*/];
        }
    });
}); };
exports.getProducts = getProducts;
var createProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, description, image, price, _b, colors, category, colorsFinded, product, error_2;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, title = _a.title, description = _a.description, image = _a.image, price = _a.price;
                _b = req.body, colors = _b.colors, category = _b.category;
                // Implementacion: creacion de una field como una lista normal. No seria pasar una listas de los ids como antes
                // sino de eso, lista de esas cosas
                colors = colors !== null && colors !== void 0 ? colors : []; // Por si la lista llegara a ser undefined o null
                _c.label = 1;
            case 1:
                _c.trys.push([1, 4, , 5]);
                console.log({ image: image });
                return [4 /*yield*/, prismaColor.findMany({
                        where: {
                            title: {
                                "in": __spreadArray([], colors, true)
                            }
                        }
                    })
                    // Probar crear un product pero con category: undefined
                ];
            case 2:
                colorsFinded = _c.sent();
                // Probar crear un product pero con category: undefined
                colorsFinded = colorsFinded.map(function (_a) {
                    var title = _a.title;
                    return ({ title: title });
                }); // Para que solo sea [ { id } ] sin title
                return [4 /*yield*/, prisma.create({
                        data: {
                            title: title,
                            description: description,
                            image: image,
                            price: price,
                            colors: {
                                connect: __spreadArray([], colorsFinded, true) // [#] Cambiar a Crear Colors o conectar segun el caso    
                            },
                            category: {
                                // No defini posibilidad de crear categories por separado, sin que esten relacionados
                                connectOrCreate: {
                                    where: {
                                        name: category // Si existe, obtengo esta category
                                    },
                                    create: {
                                        name: category // Y si no, pues la creo y la relaciono
                                    }
                                }
                            }
                        },
                        include: {
                            colors: true,
                            category: true
                        }
                    })];
            case 3:
                product = _c.sent();
                InfoResponse_1.Info.setData(201, {
                    msg: "Product created.",
                    product: product // Creo que lo podemos quitar, como si no devolviera nada
                });
                return [3 /*break*/, 5];
            case 4:
                error_2 = _c.sent();
                console.log(error_2);
                if (typeof error_2 === 'string') { // Password not provided
                    InfoResponse_1.Info.setData(500, { error: error_2 });
                }
                else {
                    InfoResponse_1.Info.setPrismaError(500, error_2);
                }
                return [3 /*break*/, 5];
            case 5:
                InfoResponse_1.Info.setResponse(res);
                return [2 /*return*/];
        }
    });
}); };
exports.createProduct = createProduct;
//# sourceMappingURL=products.controllers.js.map