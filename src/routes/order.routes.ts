import { Router } from "express";
import * as order from "../controllers/order.controllers";
import { authBy } from "../middlewares/auth/authRoles";
import { verifyToken } from "../middlewares/auth/verifyToken";
import { ROLE } from "../types";
const { USER } = ROLE

export const orderRoutes = Router()

orderRoutes
    .post('/user/:id', verifyToken, authBy(USER), order.createOrder)