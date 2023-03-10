"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.orderRoutes = void 0;
var express_1 = require("express");
var order = __importStar(require("../controllers/order.controllers"));
var authRoles_1 = require("../middlewares/auth/authRoles");
var verifyToken_1 = require("../middlewares/auth/verifyToken");
var types_1 = require("../types");
var USER = types_1.ROLE.USER;
exports.orderRoutes = (0, express_1.Router)();
exports.orderRoutes
    .post('/user/:id', verifyToken_1.verifyToken, (0, authRoles_1.authBy)(USER), order.createOrder);
