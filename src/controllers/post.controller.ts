import {Request, Response, NextFunction} from "express";
import postService from "../services/post.service.js";
import {UploadedFile} from "express-fileupload";
import {AlternativeValidationError, FieldValidationError, validationResult} from "express-validator";
import {ApiError} from "../exceptions/api-error.js";
import {
    CreatePostBody,
    DeletePostParams,
    FindPostsQueryOptions,
    UpdatePostBody,
    UpdatePostParams
} from "../types/posts/posts-request.types.js";
import {CreatedPost, DeletePostResult, GetPostsResponse, UpdatedPost,} from "../types/posts/posts-response.types.js";
import {Post} from "../db/models/post.model.js";
import ImageService from "../services/image.service.js";

class PostController {
    async createPost(
        req: Request<{}, {}, CreatePostBody>,
        res: Response<CreatedPost>,
        next: NextFunction): Promise<Response<CreatedPost> | void> {
        try {
            const result = validationResult(req);
            if (!result.isEmpty()) {
                return next(ApiError.ValidationError(result.array() as AlternativeValidationError[]));
            }
            const {title, content, tags} = req.body;
            const image = req.files?.image as UploadedFile;
            const userId = req.user.id;
            let imagePath = '';
            if (image) {
                imagePath = await ImageService.savePostImage(image);
            }
            const post = await postService.createPost({
                title,
                content,
                userId,
                image: imagePath
            }, tags.length > 0 ? tags.split(',') : []);
            return res.status(201).json(post);
        } catch (e) {
            next(e);
        }
    }

    async updatePost(
        req: Request<UpdatePostParams, {}, UpdatePostBody>,
        res: Response<UpdatedPost>,
        next: NextFunction): Promise<Response<UpdatedPost> | void> {
        try {
            const result = validationResult(req);
            if (!result.isEmpty()) {
                return next(ApiError.ValidationError(result.array() as FieldValidationError[]));
            }
            const postId = +req.params.postId;
            const userId = req.user.id;
            const {title, content, tags} = req.body;
            const image = req.files?.image as UploadedFile;
            let imagePath = '';
            if (image) {
                imagePath = await ImageService.savePostImage(image);
            }
            const post = await postService.updatePostById(postId, userId, {
                title,
                content,
                image: imagePath
            }, tags.length > 0 ? tags.split(',') : []);
            return res.status(200).json(post);
        } catch (e) {
            next(e);
        }
    }

    async deletePost(req: Request<DeletePostParams>,
                     res: Response<DeletePostResult>,
                     next: NextFunction): Promise<Response<DeletePostResult> | void> {
        try {
            const postId = +req.params.postId;
            const userId = req.user?.id;
            const isDeleted = await postService.deletePostById(postId, userId);
            return res.json({isDeleted});
        } catch (e) {
            next(e);
        }
    }

    async getAllPosts(req: Request<{}, {}, {}, FindPostsQueryOptions>, res: Response, next: NextFunction): Promise<Response<GetPostsResponse> | void> {
        try {
            const page = +req.query.page || 1;
            const limit = +req.query.limit || 10;
            const currentUserId = req.user?.id ?? null;
            const sortByQuery = req.query.sort_by || '';
            const tagsQuery = req.query.tags || '';
            const posts = await postService.getAllPosts({page, limit, sortByQuery, tagsQuery, currentUserId});
            return res.status(200).json(posts);
        } catch (e) {
            next(e);
        }
    }

    async getPostById(req: Request, res: Response, next: NextFunction): Promise<Response<Post> | void> {
        try {
            const postId = +req.params.postId;
            const post = await postService.getPostById(postId);
            return res.json(post);
        } catch (e) {
            next(e);
        }
    }
}

export default new PostController();