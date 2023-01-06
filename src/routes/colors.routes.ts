import { Router } from "express";
import * as colors from "../controllers/colors.controllers";

export const colorsRoutes = Router()

colorsRoutes
    .get('/', colors.getColors)
    .post('/', colors.createColors)