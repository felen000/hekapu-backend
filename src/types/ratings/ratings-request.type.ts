import {ParamsDictionary} from "express-serve-static-core";

export interface RatePostParams extends ParamsDictionary {
    postId: string;
}

export interface DeleteRatingParams extends ParamsDictionary {
    postId: string;
}

export interface RatePostBody {
    rating: number;
}