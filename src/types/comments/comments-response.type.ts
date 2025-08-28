import CommentDto from "../../dtos/comment/comment.dto.js";

export interface CreatedComment extends CommentDto {}

export interface GetCommentResponsePayload extends CommentDto {}

export interface GetAllCommentsResponsePayload {
    comments: CommentDto[];
    commentCount: number;
}

export interface GetRepliesResponsePayload {
    replies: CommentDto[];
    replyCount: number;
}
