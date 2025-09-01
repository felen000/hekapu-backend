import {ParamsDictionary} from "express-serve-static-core";

export interface SearchTagQueryOptions {
    tag: string;
}

export interface CreateTagBody {
    name: string;
}

export interface DeleteTagParams extends ParamsDictionary {
    tagName: string;
}
