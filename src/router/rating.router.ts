import {Router} from 'express';
import ratingController from "../controllers/rating.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import {body} from "express-validator";

const router = Router();

router.post('/posts/:postId/ratings',
    body('rating', 'Поле должно быть числом 1 или -1').isInt().isIn([1, -1]),
    authMiddleware(),
    ratingController.ratePost);
router.delete('/posts/:postId/ratings', authMiddleware(), ratingController.deleteRating);

export default router;