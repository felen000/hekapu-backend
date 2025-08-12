import {ParamsDictionary} from "express-serve-static-core";

export interface UsersRequestParams extends ParamsDictionary{
    userId: string
}

export interface PostsByUserRequestQuery {
    page: number;
    limit: number;
    sort_by: string;
    tags: string
}

export interface UpdateUserProfileBody {
    name: string
}