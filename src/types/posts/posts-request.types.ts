import { ParamsDictionary } from 'express-serve-static-core';
import {PostCreateAttrs} from "../../db/models/post.model.js";

export type CreatePostBody = Omit<PostCreateAttrs, 'image'|'userId'>

export type UpdatePostBody = Omit<PostCreateAttrs, 'image'|'userId'>

export interface FindPostsQueryOptions {
    page: number;
    limit: number;
    sort_by: string;
    tags: string
}

export interface UpdatePostParams extends ParamsDictionary{
    postId: string
}

export interface DeletePostParams extends ParamsDictionary{
    postId: string
}