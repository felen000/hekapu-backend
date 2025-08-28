import {CommentCreationAttrs} from "../db/models/comment.model.js";
import postService from "./post.service.js";
import {ApiError} from "../exceptions/api-error.js";
import commentRepository from "../repository/comment.repository.js";
import getOffset from "../helpers/get-offset.js";
import getOrderOptions from "../helpers/get-order-options.js";
import CommentDto from "../dtos/comment/comment.dto.js";

class CommentService {
    async createComment(comment: CommentCreationAttrs): Promise<CommentDto> {
        const post = await postService.getPostById(comment.postId);
        if (!post) {
            throw ApiError.NotFoundError('Указанный пост не найден.');
        }
        const createdComment = await commentRepository.createComment(comment);
        return new CommentDto(createdComment);
    }

    async getAllComments(options: {
        page: number,
        limit: number,
        userId: number,
        postId: number,
        sortByQuery: string,
    }): Promise<{
        commentCount: number,
        comments: CommentDto[]
    }> {
        const orderOptions = getOrderOptions(options.sortByQuery);
        const offset = getOffset(options.page, options.limit);
        const comments = await commentRepository.findAllComments({
            limit: options.limit,
            offset,
            order: orderOptions,
            postId: options.postId,
            userId: options.userId
        });

        return {
            commentCount: comments.commentCount,
            comments: comments.comments.map(comment => new CommentDto(comment))
        };
    }

    async getCommentById(commentId: number): Promise<CommentDto> {
        const comment = await commentRepository.findCommentById(commentId);
        if (!comment) {
            throw ApiError.NotFoundError('Указанный комментарий не найден.');
        }
        return new CommentDto(comment);
    }

    async getCommentsByPost(postId: number, page: number = 1, limit: number = 10): Promise<{
        commentCount: number,
        comments: CommentDto[]
    }> {
        const post = await postService.getPostById(postId);
        if (!post) {
            throw ApiError.NotFoundError('Указанный пост не найден.');
        }
        const offset = getOffset(page, limit);

        const comments = await commentRepository.findCommentsByPostId(postId, offset, limit);

        return {
            commentCount: comments.commentCount,
            comments: comments.comments.map(comment => new CommentDto(comment))
        };
    }

    async getReplies(postId: number, page: number = 1, limit: number = 5,): Promise<{
        replyCount: number,
        replies: CommentDto[]
    }> {
        const offset = getOffset(page, limit);
        const replies = await commentRepository.findReplies(postId, offset, limit);
        return {
            replyCount: replies.replyCount,
            replies: replies.replies.map(reply => new CommentDto(reply))
        };
    }

    async deleteComment(commentId: number, userId: number): Promise<void> {
        const comment = await commentRepository.findCommentById(commentId);
        if (!comment) {
            throw ApiError.NotFoundError('Указанный комментарий не найден.');
        }
        if (comment.userId !== userId) {
            throw ApiError.ForbiddenError('Вы не можете удалить этот комментарий.');
        }
        await commentRepository.deleteComment(commentId);
    }

}

export default new CommentService();