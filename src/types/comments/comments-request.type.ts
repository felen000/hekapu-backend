import {ParamsDictionary} from "express-serve-static-core";

export interface CreateCommentParams extends ParamsDictionary{
    postId: string
}

export interface GetCommentParams extends ParamsDictionary{
    commentId: string
}

export interface CreateCommentBody {
    postId: number;
    content: string;
    parentId?: number | null;
}

export interface GetCommentsParams extends ParamsDictionary {
    postId: string;
}

export interface GetRepliesParams extends ParamsDictionary {
    parentId: string;
}

export interface DeleteCommentParams extends ParamsDictionary {
    commentId: string;
}

export interface GetAllCommentsQueryOptions {
    page: string;
    limit: string;
    sort_by: string;
    userId: string;
    postId: string;
}

export interface GetCommentsByPostQueryOptions {
    page: string;
    limit: string;
    sort_by: string;
}

export interface GetRepliesQueryOptions {
    page: string;
    limit: string;
}