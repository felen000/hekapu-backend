import UserDto from "../../dtos/user/user.dto.js";

export interface GetFollowersResponse {
    followers: UserDto[],
    followerCount: number
}

export interface GetFollowingsResponse {
    followings: UserDto[],
    followingCount: number
}