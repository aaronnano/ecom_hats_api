import { Router } from "express";
import * as reviews from "../controllers/reviews.controllers";
import { authBy } from "../middlewares/auth/authRoles";
import { verifyToken } from "../middlewares/auth/verifyToken";
import { ROLE } from "../types";
const { USER } = ROLE

export const reviewsRoutes = Router()

reviewsRoutes
    .get('/product/:productId', reviews.getReviewsFromProduct)
    .post('/user/:id', verifyToken, authBy(USER), reviews.createReview)
    .put('/:reviewId/user/:id', verifyToken, authBy(USER), reviews.updateReview)
    .delete('/:reviewId/user/:id', verifyToken, authBy(USER), reviews.deleteReview)