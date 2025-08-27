import {Post} from "../../db/models/post.model.js";
import UserDto from "../../dtos/user/user.dto.js";

export interface GetUsersResponse {
    users: UserDto[];
    userCount: number;
}

export interface GetUserprofileResponse extends UserDto {
}

export interface GetPostsByUserResponse {
    posts: Post[];
    postCount: number;
}

export interface UpdateUserProfileResponse extends UserDto {
}