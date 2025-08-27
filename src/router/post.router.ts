import {Router} from "express";
import postController from "../controllers/post.controller.js";
import {body} from "express-validator";
import authMiddleware from "../middlewares/auth.middleware.js";
import activatedMiddleware from "../middlewares/activated.middleware.js";

const router = Router();

router.get('/', authMiddleware({required: false}), postController.getAllPosts);
router.get('/:postId', postController.getPostById);
router.post('/',
    authMiddleware(),
    activatedMiddleware,
    body('title', 'Поле не может быть пустым.').notEmpty(),
    postController.createPost);
router.put('/:postId',
    authMiddleware(),
    activatedMiddleware,
    body('title', 'Поле не может быть пустым.').notEmpty(),
    postController.updatePost);
router.delete('/:postId', authMiddleware(), activatedMiddleware, postController.deletePost);

export default router;

