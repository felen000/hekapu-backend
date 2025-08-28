import UserDto from "../user/user.dto.js";
import {Comment} from "../../db/models/comment.model.js";

export default class CommentDto {
    id: number;
    content: string;
    parentId?: number;
    createdAt: Date;
    user?: UserDto;

    constructor(comment: Comment) {
        this.id = comment.id;
        this.content = comment.content;
        if (comment.parentId) {
            this.parentId = comment.parentId;
        }
        this.createdAt = comment.createdAt;
        if (comment.user) {
            this.user = new UserDto(comment.user);
        }
    }
}