import TagDto from "../../dtos/tag/tag.dto.js";

export interface CreateTagResponse extends TagDto {}

export interface GetTagsResponse {
    tags: TagDto[];
}