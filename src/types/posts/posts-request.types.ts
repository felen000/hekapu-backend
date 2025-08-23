import {ParamsDictionary,Query} from 'express-serve-static-core';

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

export interface FindPostsQueryOptions extends Query{
    page: string;
    limit: string;
    sort_by: string;
    tags: string;
}

export interface UpdatePostParams extends ParamsDictionary {
    postId: string;
}

export interface DeletePostParams extends ParamsDictionary {
    postId: string;
}