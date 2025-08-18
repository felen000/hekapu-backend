import {Comment, CommentCreationAttrs} from "../db/models/comment.model.js";
import postService from "./post.service.js";
import {ApiError} from "../exceptions/api-error.js";
import commentRepository from "../repository/comment.repository.js";
import getOffset from "../helpers/get-offset.js";
import getOrderOptions from "../helpers/get-order-options.js";

class CommentService {
    async createComment(comment: CommentCreationAttrs) {
        const post = await postService.getPostById(comment.postId);
        if (!post) {
            throw ApiError.NotFoundError('Указанный пост не найден.');
        }
        return await commentRepository.createComment(comment);
    }

    async getAllComments(options: {
        page: number,
        limit: number,
        userId: number,
        postId: number,
        sortByQuery: string,
    }): Promise<{
        commentCount: number,
        comments: Comment[]
    }> {
        const orderOptions = getOrderOptions(options.sortByQuery);
        const offset = getOffset(options.page, options.limit);
        return await commentRepository.findAllComments({
            limit: options.limit,
            offset,
            order: orderOptions,
            postId: options.postId,
            userId: options.userId
        });
    }

    async getCommentById(commentId: number): Promise<Comment> {
        const comment = await commentRepository.findCommentById(commentId);
        if (!comment) {
            throw ApiError.NotFoundError('Указанный комментарий не найден.');
        }
        return comment;
    }

    async getCommentsByPost(postId: number, page: number = 1, limit: number = 10): Promise<{
        commentCount: number,
        comments: Comment[]
    }> {
        const post = await postService.getPostById(postId);
        if (!post) {
            throw ApiError.NotFoundError('Указанный пост не найден.');
        }
        const offset = getOffset(page, limit);

        return await commentRepository.findCommentsByPostId(postId, offset, limit);
    }

    async getReplies(postId: number, page: number = 1, limit: number = 5,): Promise<{
        replyCount: number,
        replies: Comment[]
    }> {
        const offset = getOffset(page, limit);
        return await commentRepository.findReplies(postId, offset, limit);
    }

    async deleteComment(commentId: number, userId: number): Promise<boolean> {
        const comment = await commentRepository.findCommentById(commentId);
        if (!comment) {
            throw ApiError.NotFoundError('Указанный комментарий не найден.');
        }
        if (comment.userId !== userId) {
            throw ApiError.ForbiddenError('Вы не можете удалить этот комментарий.');
        }
        const deletedRowsCount = await commentRepository.deleteComment(commentId);
        return deletedRowsCount > 0;
    }

}

export default new CommentService();