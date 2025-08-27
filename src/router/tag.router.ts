import {Router} from 'express';
import tagController from "../controllers/tag.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";
import activatedMiddleware from "../middlewares/activated.middleware.js";

const router = Router();

router.get('/', tagController.getTagsByQuery);
router.post('/', authMiddleware(), activatedMiddleware, tagController.createTag);
router.delete('/:tagName', authMiddleware(), activatedMiddleware, roleMiddleware('ADMIN'), tagController.deleteTag);

export default router;