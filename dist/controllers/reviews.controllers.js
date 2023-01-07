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
exports.__esModule = true;
exports.deleteReview = exports.updateReview = exports.createReview = exports.getReviewsFromProduct = void 0;
var client_1 = require("@prisma/client");
var InfoResponse_1 = require("../libs/InfoResponse");
var Models_1 = require("../models/Models");
var prisma = new client_1.PrismaClient({ errorFormat: 'minimal' }).review;
// Seria bueno que en todas las request, se devuelve siempre el Model que requira el Front aunque 
// la request no sea un get
var getReviewsFromProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productId, reviews, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                productId = req.params // ProductId
                .productId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.findMany({
                        where: {
                            productId: Number(productId)
                        },
                        include: {
                            user: true
                        }
                    })];
            case 2:
                reviews = _a.sent();
                reviews = reviews.map(function (review) { return new Models_1.Review(review); });
                InfoResponse_1.Info.setData(201, {
                    msg: 'Succesful.',
                    reviews: reviews
                });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                if (typeof error_1 === 'string') { // My custom errors. No hay aun nada
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
exports.getReviewsFromProduct = getReviewsFromProduct;
var createReview = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, _a, comment, product, productId, reviewFinded, review, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                userId = req.params // Get: Get User by id
                .id;
                _a = req.body, comment = _a.comment, product = _a.product;
                productId = product.id;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, prisma.findMany({
                        where: {
                            productId: productId,
                            userId: Number(userId)
                        }
                    })];
            case 2:
                reviewFinded = _b.sent();
                if (reviewFinded.length !== 0)
                    throw "The user ".concat(userId, " alredy have a Review for the Product ").concat(productId);
                return [4 /*yield*/, prisma.create({
                        data: {
                            comment: comment,
                            productId: productId,
                            userId: Number(userId)
                        },
                        include: {
                            user: true
                        }
                    })];
            case 3:
                review = _b.sent();
                review = new Models_1.Review(review);
                InfoResponse_1.Info.setData(201, {
                    msg: "User created.",
                    review: review
                });
                return [3 /*break*/, 5];
            case 4:
                error_2 = _b.sent();
                if (typeof error_2 === 'string') { // Password not provided
                    InfoResponse_1.Info.setData(500, { error: error_2 });
                }
                else {
                    InfoResponse_1.Info.setPrismaError(500, error_2);
                }
                console.log({ error: error_2 });
                return [3 /*break*/, 5];
            case 5:
                InfoResponse_1.Info.setResponse(res);
                return [2 /*return*/];
        }
    });
}); };
exports.createReview = createReview;
var updateReview = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var reviewId, comment, review, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                reviewId = req.params // Get: Get User by id
                .reviewId;
                comment = req.body.comment;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.update({
                        where: {
                            id: Number(reviewId)
                        },
                        data: { comment: comment },
                        include: {
                            user: true
                        }
                    })];
            case 2:
                review = _a.sent();
                review = new Models_1.Review(review);
                InfoResponse_1.Info.setData(201, {
                    msg: "User created.",
                    review: review
                });
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                if (typeof error_3 === 'string') { // Password not provided
                    InfoResponse_1.Info.setData(500, { error: error_3 });
                }
                else {
                    InfoResponse_1.Info.setPrismaError(500, error_3);
                }
                console.log({ error: error_3 });
                return [3 /*break*/, 4];
            case 4:
                InfoResponse_1.Info.setResponse(res);
                return [2 /*return*/];
        }
    });
}); };
exports.updateReview = updateReview;
var deleteReview = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var reviewId, user, deletedReview, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                reviewId = req.params.reviewId;
                user = req.body.user;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma["delete"]({
                        where: {
                            id: Number(reviewId)
                        }
                    })];
            case 2:
                deletedReview = _a.sent();
                InfoResponse_1.Info.setData(201, {
                    msg: "User deleted.",
                    deletedReview: deletedReview
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
exports.deleteReview = deleteReview;
