import {Router} from "express";
import subscriptionController from "../controllers/subscription.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import activatedMiddleware from "../middlewares/activated.middleware.js";

const router = Router();

router.post('/:userId/subscribe', authMiddleware(), activatedMiddleware, subscriptionController.subscribe);
router.delete('/:userId/unsubscribe', authMiddleware(), activatedMiddleware, subscriptionController.unsubscribe);
router.get('/:userId/followers', authMiddleware(), activatedMiddleware, subscriptionController.getFollowers);
router.get('/:userId/followings', authMiddleware(), activatedMiddleware, subscriptionController.getFollowings);


export default router;