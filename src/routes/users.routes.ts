import { Router } from "express";
import * as users from "../controllers/users.controllers";
import { authBy } from "../middlewares/auth/authRoles";
import { verifyToken } from "../middlewares/auth/verifyToken";
import { ROLE } from "../types";
const { USER } = ROLE

export const usersRoutes = Router()

usersRoutes // Add roles. Poner verifyToken
    .get('/:id', verifyToken, authBy(USER), users.getUser)
    .post('/', authBy(), users.createUser)
    .put('/:id', verifyToken, authBy(USER), users.updateUser)  // Requires Token and accepts User role
    .delete('/:id', authBy(), users.deleteUser)
    .delete('/:id/address/:addressId', verifyToken, authBy(USER), users.deleteUserAddress)