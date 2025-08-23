import { Router } from 'express';
import authMiddleware from "../middlewares/auth.middleware.js";
import userController from "../controllers/user.controller.js";

const router = Router();

router.get('/', userController.getAllUsers)
router.get('/:userId/profile', userController.getUserProfile)
router.get('/:userId/posts' , userController.getPostsByUser)
router.put('/',authMiddleware(), userController.updateUserProfile)
router.delete('/', authMiddleware(), userController.deleteUser)

export default router;