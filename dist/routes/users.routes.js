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
exports.usersRoutes = void 0;
var express_1 = require("express");
var users = __importStar(require("../controllers/users.controllers"));
var authRoles_1 = require("../middlewares/auth/authRoles");
var verifyToken_1 = require("../middlewares/auth/verifyToken");
var types_1 = require("../types");
var USER = types_1.ROLE.USER;
exports.usersRoutes = (0, express_1.Router)();
exports.usersRoutes // Add roles. Poner verifyToken
    .get('/:id', verifyToken_1.verifyToken, (0, authRoles_1.authBy)(USER), users.getUser)
    .post('/', (0, authRoles_1.authBy)(), users.createUser)
    .put('/:id', verifyToken_1.verifyToken, (0, authRoles_1.authBy)(USER), users.updateUser) // Requires Token and accepts User role
["delete"]('/:id', (0, authRoles_1.authBy)(), users.deleteUser)["delete"]('/:id/address/:addressId', verifyToken_1.verifyToken, (0, authRoles_1.authBy)(USER), users.deleteUserAddress);
//# sourceMappingURL=users.routes.js.map