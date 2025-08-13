import {Post, PostCreateAttrs, PostUpdateAttrs} from "../db/models/post.model.js";
import {ApiError} from "../exceptions/api-error.js";
import postRepository from "../repository/post.repository.js";
import {PostsReceivingOptions} from "../types/posts/posts-receiving-options.types.js";

class PostService {
    async createPost(postData: PostCreateAttrs): Promise<Post> {
        if (!postData.image && !postData.content) {
            throw ApiError.BadRequestError('Пост не может состоять из одного заголовка.');
        }
        const post = await postRepository.createPost(postData);
        return post;
    }

    async updatePostById(postId: number, userId: number, postData: PostUpdateAttrs): Promise<Post> {
        const post = await postRepository.findPostById(postId);

        if (!post) {
            throw ApiError.NotFoundError('Указанный пост не существует.');
        }

        if (post.userId !== userId) {
            throw ApiError.ForbiddenError('Вы не можете редактировать этот пост.');
        }

        const valuesToUpdate: PostUpdateAttrs = {};
        if(postData.title) valuesToUpdate.title = postData.title;
        if(postData.content) valuesToUpdate.content = postData.content;
        if(postData.image) valuesToUpdate.image = postData.image;

        return await postRepository.updatePostById(postId, valuesToUpdate);

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

    async getAllPosts(options: PostsReceivingOptions): Promise<{ posts:Post[], postCount: number }> {
        return await postRepository.findPosts(options);
    }
}

export default new PostService();