import { Router } from "express";
import * as auth from "../controllers/auth.controllers";
import { verifyToken } from "../middlewares/auth/verifyToken";

export const authRoutes = Router()

// /auth
authRoutes
    .post('/register', auth.toRegister)
    .post('/login', auth.toLogin)
    .get('/check', verifyToken, auth.loginWithToken)
    // Debe existir el token para poder hacer el refresh. Generar uno nuevo a partir de uno existente