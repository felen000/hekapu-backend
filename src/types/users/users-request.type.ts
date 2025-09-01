import {ParamsDictionary} from "express-serve-static-core";

export interface GetUserprofileParams extends ParamsDictionary{
    userId: string
}

export interface GetPostsByUserParams extends ParamsDictionary{
    userId: string
}

export interface GetPostsByUserQuery {
    page: number;
    limit: number;
    sort_by: string;
    tags: string
}

export interface UpdateUserProfileBody {
    name: string
}