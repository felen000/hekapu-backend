import {ParamsDictionary} from "express-serve-static-core";

export interface SubscribeParams extends ParamsDictionary {
    userId: string;
}

export interface UnsubscribeParams extends ParamsDictionary {
    userId: string;
}

export interface GetFollowersParams extends ParamsDictionary {
    userId: string;
}

export interface GetFollowingsParams extends ParamsDictionary {
    userId: string;
}