import {Table, Column, Model, HasMany, Unique, BelongsToMany, AllowNull} from "sequelize-typescript";
import {Post} from "./post.model.js";
import {PostTag} from "./post-tag.model.js";

@Table
export class Tag extends Model<Tag> {
    @Unique
    @AllowNull(false)
    @Column
    name!: string;

    @BelongsToMany(()=> Post, ()=> PostTag)
    posts?: PostTag[];
}