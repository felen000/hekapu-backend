import {Tag} from "../../db/models/tag.js";

export interface CreateTagResponse {
    name: string;
}

export interface GetTagsResponse {
    tags: Tag[];
}