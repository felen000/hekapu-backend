import {Router} from 'express';
import ratingController from "../controllers/rating.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import {body} from "express-validator";
import activatedMiddleware from "../middlewares/activated.middleware.js";

const router = Router();

router.post('/posts/:postId/ratings',
    authMiddleware(),
    activatedMiddleware,
    body('rating', 'Поле должно быть числом 1 или -1').isInt().isIn([1, -1]),
    ratingController.ratePost);
router.delete('/posts/:postId/ratings', authMiddleware(), activatedMiddleware, ratingController.deleteRating);

export default router;