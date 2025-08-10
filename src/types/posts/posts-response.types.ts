import {Post} from "../../db/models/post.model.js";

export type CreatedPost =  Post
export type UpdatedPost = Post
export interface DeletePostResult {
    isDeleted: boolean
}