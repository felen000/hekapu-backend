import {Table, Column, Model, HasMany, ForeignKey} from "sequelize-typescript";
import {Post} from "./post.model.js";
import {User} from "./user.model.js";
import {Tag} from "./tag.js";

@Table
export class PostTag extends Model<PostTag> {
    @ForeignKey(() => Post)
    @Column
    postId!: number;

    @ForeignKey(() => Tag)
    @Column
    tagId!: number;
}