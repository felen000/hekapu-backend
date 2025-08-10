import {Post, PostCreateAttrs, PostUpdateAttrs} from "../db/models/post.model.js";
import {PostsReceivingOptions} from "../types/posts/posts-receiving-options.types.js";

class PostRepository {
    async createPost(postData: PostCreateAttrs): Promise<Post> {
        const post = await Post.create(postData);
        return post;
    }

    async updatePostById(postId: number, postData: PostUpdateAttrs): Promise<Post> {
        const [_, [updatedPost]] = await Post.update(postData, {where: {id: postId}, returning: true});
        return updatedPost;
    }

    async deletePostById(id: number): Promise<number> {
        return await Post.destroy({where: {id}});
    }

    async findPostById(id: number): Promise<Post | null> {
        return await Post.findOne({where: {id}});
    }

    async findPosts(options: PostsReceivingOptions): Promise<{posts: Post[], postCount: number}> {
        const findResult =  await Post.findAndCountAll(options);
        return {posts: findResult.rows, postCount: findResult.count};
    }
}

export default new PostRepository();