import {Post, PostCreateAttrs, PostUpdateAttrs} from "../db/models/post.model.js";
import {ApiError} from "../exceptions/api-error.js";
import postRepository from "../repository/post.repository.js";
import tagService from "./tag.service.js";
import {sequelize} from "../db/index.js";
import {Transaction} from "sequelize";
import getOrderOptions from "../helpers/get-order-options.js";
import getOffset from "../helpers/get-offset.js";

class PostService {
    async createPost(postData: PostCreateAttrs, tagNames: string[]): Promise<Post> {
        if (!postData.image && !postData.content) {
            throw ApiError.BadRequestError('Пост не может состоять из одного заголовка.');
        }
        return await sequelize.transaction(async (t: Transaction) => {
            const post = await postRepository.createPost(postData, t);
            if (tagNames.length > 0) {
                const tags = await tagService.getOrCreateTags(tagNames, t);
                await post.$add('tags', tags, {transaction: t});
            }
            return post;
        });

    }

    async updatePostById(postId: number, userId: number, postData: PostUpdateAttrs, tagNames: string[]): Promise<Post> {
        const post = await postRepository.findPostById(postId);

        if (!post) {
            throw ApiError.NotFoundError('Указанный пост не существует.');
        }

        if (post.userId !== userId) {
            throw ApiError.ForbiddenError('Вы не можете редактировать этот пост.');
        }

        const valuesToUpdate: PostUpdateAttrs = {};
        if (postData.title) valuesToUpdate.title = postData.title;
        if (postData.content) valuesToUpdate.content = postData.content;
        if (postData.image) valuesToUpdate.image = postData.image;

        return await sequelize.transaction(async (t: Transaction) => {
            const post = await postRepository.updatePostById(postId, valuesToUpdate, t);
            if (tagNames.length > 0) {
                const tags = await tagService.getOrCreateTags(tagNames, t);
                await post.$set('tags', tags, {transaction: t});
            }
            return post;
        });
    }

    async deletePostById(postId: number, userId: number): Promise<boolean> {
        const post = await postRepository.findPostById(postId);

        if (!post) {
            throw ApiError.NotFoundError('Указанный пост не существует.');
        }

        if (post.userId !== userId) {
            throw ApiError.ForbiddenError('Вы не можете удалить этот пост.');
        }

        const deletedRowsCount = await postRepository.deletePostById(postId);
        return deletedRowsCount > 0;
    }

    async getPostById(postId: number): Promise<Post> {
        const post = await postRepository.findPostById(postId);
        if (!post) {
            throw ApiError.NotFoundError('Указанный пост не существует.');
        }
        return post;
    }

    async getAllPosts(options: {
        page: number,
        limit: number,
        sortByQuery: string,
        tagsQuery: string,
        userId?: number,
        currentUserId?: number
    }): Promise<{
        posts: Post[],
        postCount: number
    }> {
        const orderOptions = getOrderOptions(options.sortByQuery);
        const offset = getOffset(options.page, options.limit);
        const tags = options.tagsQuery?.length > 0 ? options.tagsQuery.split(',') : [];
        return await postRepository.findPosts({
            offset,
            limit: options.limit,
            order: orderOptions,
            tags,
            userId: options.userId,
            currentUserId: options.currentUserId
        });
    }
}

export default new PostService();