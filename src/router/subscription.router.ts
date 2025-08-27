import {Router} from "express";
import subscriptionController from "../controllers/subscription.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.post('/:userId/subscribe', authMiddleware(), subscriptionController.subscribe);
router.delete('/:userId/unsubscribe', authMiddleware(), subscriptionController.unsubscribe);
router.get('/:userId/followers', authMiddleware(), subscriptionController.getFollowers);
router.get('/:userId/followings', authMiddleware(), subscriptionController.getFollowings);


export default router;