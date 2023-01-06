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
exports.cartRoutes = void 0;
var express_1 = require("express");
var cart = __importStar(require("../controllers/cart.controllers"));
var authRoles_1 = require("../middlewares/auth/authRoles");
var verifyToken_1 = require("../middlewares/auth/verifyToken");
var types_1 = require("../types");
var USER = types_1.ROLE.USER;
exports.cartRoutes = (0, express_1.Router)();
// Buscar un modo de realizar operaciones si estar pasando el id del User por el path
// Aunque capaz el admin (que tiene propio id) puede desear eliminar o añadir algo en otro User (con id distinto)
exports.cartRoutes
    .get('/user/:id', verifyToken_1.verifyToken, (0, authRoles_1.authBy)(USER), cart.getCartFromUser)
    .post('/user/:id', verifyToken_1.verifyToken, (0, authRoles_1.authBy)(USER), cart.createCartItem)["delete"]('/:itemId/user/:id', verifyToken_1.verifyToken, (0, authRoles_1.authBy)(USER), cart.deleteCartItem);
// Item de que user elimino. No seria necesario recibir por el path el id del User, podriamos hacer
// que la funcion decidiera si hacer la accion o no segun a quien pertenece este cartItem, con prisma
// Habria que cambiar mejor las cosas
//# sourceMappingURL=cart.routes.js.map