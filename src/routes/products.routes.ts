import { Router } from "express";
import * as products from "../controllers/products.controllers";

export const productsRoutes = Router()

productsRoutes
    .get('/', products.getProducts)
    .post('/', products.createProduct)