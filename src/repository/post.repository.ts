import {Post, PostCreateAttrs, PostUpdateAttrs} from "../db/models/post.model.js";
import {PostsReceivingOptions} from "../types/posts/posts-receiving-options.types.js";
import {Transaction} from "sequelize";
import {sequelize} from "../db/index.js";
import {Rating} from "../db/models/rating.model.js";

class PostRepository {
    async createPost(postData: PostCreateAttrs, transaction?: Transaction): Promise<Post> {
        return await Post.create(postData, {transaction});
    }

    async updatePostById(postId: number, postData: PostUpdateAttrs, transaction?: Transaction): Promise<Post> {
        const [_, [updatedPost]] = await Post.update(postData, {where: {id: postId}, returning: true, transaction});
        return updatedPost;
    }

    async deletePostById(id: number): Promise<number> {
        return await Post.destroy({where: {id}});
    }

    async findPostById(id: number): Promise<Post | null> {
        return await Post.findOne({where: {id}});
    }

    async findPosts(options: PostsReceivingOptions): Promise<{ posts: Post[], postCount: number }> {
        const include: any[] = [
            {
                association: 'tags',
                attributes: ["name"],
                through: {attributes: []},
            },
        ];

        if (options.currentUserId) {
            include.push({
                model: Rating,
                attributes: ['rate'],
                where: {userId: options.currentUserId},
                required: false
            });
        }
        if (options.tags && options.tags.length > 0) {
            include.push({
                association: 'filterTags',
                attributes: [],
                where: ({name: options.tags}),
                through: {attributes: []},
                required: true
            });
        }
        const findResult = await Post.findAndCountAll({
            limit: options.limit,
            offset: options.offset,
            order: options.order,
            where: options.userId ? {userId: options.userId} : undefined,
            distinct: true,
            attributes: {
                include: [
                    [
                        sequelize.literal(`(
                              SELECT COUNT(*)::int
                              FROM "Comments" AS c
                              WHERE c."postId" = "Post"."id"
                            )`),
                        'commentCount'
                    ],
                ]
            },
            include
        });
        return {posts: findResult.rows, postCount: findResult.count};
    }

    async incrementRating(postId: number, by: number, transaction?: Transaction): Promise<void> {
        await Post.increment('rating', {by, where: {id: postId}, transaction});
    }
}

export default new PostRepository();