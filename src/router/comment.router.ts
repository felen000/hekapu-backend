import {Router} from "express";
import commentController from "../controllers/comment.controller.js";
import {body} from "express-validator";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.get('/posts/:postId/comments', commentController.getCommentsByPost);
router.post('/posts/:postId/comments',
    authMiddleware,
    body('content', 'КомментариЙ не может быть пустым').notEmpty(),
    commentController.createComment);
router.get('/comments', commentController.getAllComments);
router.get('/comments/:commentId', commentController.getCommentById);
router.get('/comments/:commentId/replies', commentController.getReplies);
router.delete('/comments/:commentId', authMiddleware, commentController.deleteComment);

export default router;