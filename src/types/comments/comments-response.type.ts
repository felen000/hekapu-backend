import CommentDto from "../../dtos/comment/comment.dto.js";

export interface CreatedComment extends CommentDto {}

export interface GetCommentResponsePayload extends CommentDto {}

export interface GetAllCommentsResponse {
    comments: CommentDto[];
    commentCount: number;
}

export interface GetRepliesResponse {
    replies: CommentDto[];
    replyCount: number;
}
