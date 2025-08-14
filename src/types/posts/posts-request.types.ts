import {ParamsDictionary} from 'express-serve-static-core';

export interface CreatePostBody {
    title: string;
    content: string;
    tags: string;
}

export interface UpdatePostBody {
    title: string;
    content: string;
    tags: string;
}

export interface FindPostsQueryOptions {
    page: number;
    limit: number;
    sort_by: string;
    tags: string;
}

export interface UpdatePostParams extends ParamsDictionary {
    postId: string;
}

export interface DeletePostParams extends ParamsDictionary {
    postId: string;
}