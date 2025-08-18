import {Comment, CommentCreationAttrs} from "../db/models/comment.model.js";
import {User} from "../db/models/user.model.js";
import {CommentsReceivingOptions} from "../types/comments/comments-receiving-options.js";

class CommentRepository {
    async createComment(comment: CommentCreationAttrs): Promise<Comment> {
        return await Comment.create(comment);
    }

    async findAllComments(options: CommentsReceivingOptions): Promise<{ commentCount: number, comments: Comment[] }> {
        let whereOptions: { postId?: number, userId?: number } = {};
        if (options.postId) whereOptions.postId = options.postId;
        if (options.userId) whereOptions.userId = options.userId;
        const {rows, count} = await Comment.findAndCountAll({
            limit: options.limit,
            offset: options.offset,
            order: options.order,
            where: whereOptions,
            include: {
                model: User,
                attributes: ['name', 'profilePicture'],
            }
        });
        return {commentCount: count, comments: rows};
    }

    async findCommentsByPostId(postId: number, offset: number = 0, limit: number = 10): Promise<{
        commentCount: number,
        comments: Comment[]
    }> {
        const {rows, count} = await Comment.findAndCountAll({
            where: {postId, parentId: null},
            offset,
            limit,
            include: {
                model: User,
                attributes: ['name', 'profilePicture'],
            }
        });
        return {commentCount: count, comments: rows};
    }

    async findReplies(parentId: number, offset: number = 0, limit: number = 5): Promise<{ replyCount: number, replies: Comment[] }> {
        const {rows, count} = await Comment.findAndCountAll({
            where: {parentId},
            offset,
            limit,
            include: {
                model: User,
                attributes: ['name', 'profilePicture'],
            }
        });
        return {replyCount: count, replies: rows};
    }

    async findCommentById(id: number): Promise<Comment | null> {
        return await Comment.findOne({where: {id}});
    }

    async deleteComment(commentId: number): Promise<number> {
        return await Comment.destroy({where: {id: commentId}});
    }
}

export default new CommentRepository();