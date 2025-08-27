import {Comment} from "../../db/models/comment.model.js";

export interface CreatedComment extends Comment {}

export interface GetCommentResponsePayload extends Comment {}

export interface GetAllCommentsResponsePayload {
    comments: Comment[];
    commentCount: number;
}

export interface GetRepliesResponsePayload {
    replies: Comment[];
    replyCount: number;
}
