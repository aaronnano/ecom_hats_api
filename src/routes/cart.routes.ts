import { Router } from "express";
import * as cart from "../controllers/cart.controllers";
import { authBy } from "../middlewares/auth/authRoles";
import { verifyToken } from "../middlewares/auth/verifyToken";
import { ROLE } from "../types";
const { USER } = ROLE

export const cartRoutes = Router()

// Buscar un modo de realizar operaciones si estar pasando el id del User por el path
// Aunque capaz el admin (que tiene propio id) puede desear eliminar o añadir algo en otro User (con id distinto)
cartRoutes
    .get('/user/:id', verifyToken, authBy(USER), cart.getCartFromUser)
    .post('/user/:id', verifyToken, authBy(USER), cart.createCartItem)
    .delete('/:itemId/user/:id', verifyToken, authBy(USER), cart.deleteCartItem)
    // Item de que user elimino. No seria necesario recibir por el path el id del User, podriamos hacer
    // que la funcion decidiera si hacer la accion o no segun a quien pertenece este cartItem, con prisma
    // Habria que cambiar mejor las cosas

