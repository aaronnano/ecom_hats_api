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
exports.getColors = exports.createColors = void 0;
var client_1 = require("@prisma/client");
var InfoResponse_1 = require("../libs/InfoResponse");
var prisma = new client_1.PrismaClient({ errorFormat: 'minimal' }).color;
var createColors = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var colors, colorsMapped, colorsCreated, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                colors = req.body.colors;
                colorsMapped = colors.map(function (title) { return ({ title: title.toUpperCase() }); }) // { title: '#color'}
                ;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.createMany({
                        data: __spreadArray([], colorsMapped, true)
                    })];
            case 2:
                colorsCreated = _a.sent();
                InfoResponse_1.Info.setData(201, {
                    msg: "Color created.",
                    colors: colorsCreated
                });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                if (typeof error_1 === 'string') { // Password not provided
                    InfoResponse_1.Info.setData(500, { error: error_1 });
                }
                else {
                    InfoResponse_1.Info.setPrismaError(500, error_1);
                }
                return [3 /*break*/, 4];
            case 4:
                InfoResponse_1.Info.setResponse(res);
                return [2 /*return*/];
        }
    });
}); };
exports.createColors = createColors;
var getColors = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var colors, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, prisma.findMany()];
            case 1:
                colors = _a.sent();
                colors = colors.map(function (_a) {
                    var title = _a.title;
                    return title;
                });
                InfoResponse_1.Info.setData(201, {
                    msg: 'Succesful.',
                    colors: colors
                });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                if (typeof error_2 === 'string') { // Password not provided
                    InfoResponse_1.Info.setData(500, { error: error_2 });
                }
                else {
                    InfoResponse_1.Info.setPrismaError(500, error_2);
                }
                return [3 /*break*/, 3];
            case 3:
                InfoResponse_1.Info.setResponse(res);
                return [2 /*return*/];
        }
    });
}); };
exports.getColors = getColors;
