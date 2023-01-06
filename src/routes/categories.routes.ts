import { Router } from "express";
import * as categories from "../controllers/categories.controllers";

export const routes = Router()

routes
    .get('/', categories.getCategories)