import {Request, Response, NextFunction} from "express";
import commentService from "../services/comment.service.js";
import {FieldValidationError, validationResult} from "express-validator";
import {ApiError} from "../exceptions/api-error.js";
import {
    CreateCommentBody, CreateCommentParams,
    DeleteCommentParams, GetAllCommentsQueryOptions, GetCommentParams, GetCommentsByPostQueryOptions,
    GetCommentsParams,
    GetRepliesParams, GetRepliesQueryOptions
} from "../types/comments/comments-request.type.js";
import {
    CreatedComment,
    GetAllCommentsResponse,
    GetCommentResponsePayload, GetRepliesResponse
} from "../types/comments/comments-response.type.js";



class CommentController {
    async createComment(
        req: Request<CreateCommentParams, {}, CreateCommentBody>,
        res: Response<CreatedComment>,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            const result = validationResult(req);
            if (!result.isEmpty()) {
                return next(ApiError.ValidationError(result.array() as FieldValidationError[]));
            }
            const userId = req.user.id;
            const postId = +req.params.postId;
            const {content, parentId = null} = req.body;
            const comment = await commentService.createComment({postId, content, parentId, userId});

            return res.status(201).json(comment);
        } catch (e) {
            next(e);
        }
    }

    async getCommentById(
        req: Request<GetCommentParams>,
        res: Response<GetCommentResponsePayload>,
        next: NextFunction): Promise<Response | void> {
        try {
            const commentId = +req.params.commentId;
            const comment = await commentService.getCommentById(commentId);
            return res.status(200).json(comment);
        } catch (e) {
            next(e);
        }
    }

    async getAllComments(
        req: Request<{}, {}, {}, GetAllCommentsQueryOptions>,
        res: Response<GetAllCommentsResponse>,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            const page = +req.query.page || 1;
            const limit = +req.query.limit || 10;
            const userId = +req.query.userId;
            const postId = +req.query.postId;
            const sortByQuery = req.query.sort_by;
            const comments = await commentService.getAllComments({page, limit, userId, postId, sortByQuery});
            return res.status(200).json(comments);
        } catch (e) {
            next(e);
        }
    }

    async getCommentsByPost(
        req: Request<GetCommentsParams, {}, {}, GetCommentsByPostQueryOptions>,
        res: Response<GetAllCommentsResponse>,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            const postId = +req.params.postId;
            const page = +req.query.page || 1;
            const limit = +req.query.limit || 10;
            const comments = await commentService.getCommentsByPost(postId, page, limit);
            return res.status(200).json(comments);
        } catch (e) {
            next(e);
        }
    }

    async getReplies(
        req: Request<GetRepliesParams, {}, {}, GetRepliesQueryOptions>,
        res: Response<GetRepliesResponse>,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            const parentId = +req.params.commentId;
            const page = +req.query.page || 1;
            const limit = +req.query.limit || 10;
            const replies = await commentService.getReplies(parentId, page, limit);
            return res.status(200).json(replies);
        } catch (e) {
            next(e);
        }
    }

    async deleteComment(
        req: Request<DeleteCommentParams>,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            const commentId = +req.params.commentId;
            const userId = req.user.id;
            await commentService.deleteComment(commentId, userId);
            return res.status(204).send();
        } catch (e) {
            next(e);
        }
    }
}

export default new CommentController();