import {Table, Column, Model, HasMany, ForeignKey} from "sequelize-typescript";
import {Post} from "./post.model.js";
import {Tag} from "./tag.js";

@Table({createdAt:false, updatedAt:false})
export class PostTag extends Model<PostTag> {
    @ForeignKey(() => Post)
    @Column
    postId!: number;

    @ForeignKey(() => Tag)
    @Column
    tagId!: number;
}