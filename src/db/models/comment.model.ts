import {Table, Column, Model, HasMany, ForeignKey, BelongsTo, CreatedAt, AllowNull} from "sequelize-typescript";
import {Post} from "./post.model.js";
import {User} from "./user.model.js";

@Table
export class Comment extends Model<Comment> {
    @AllowNull(false)
    @ForeignKey(() => Post)
    @Column
    postId!: number;

    @BelongsTo(() => Post)
    post?: Post;

    @AllowNull(false)
    @ForeignKey(() => User)
    @Column
    userId!: number;

    @BelongsTo(() => User)
    user?: User;

    @AllowNull(false)
    @Column
    content!: string;

    @ForeignKey(() => Comment)
    @Column
    parentId?: number;

    @BelongsTo(() => Comment, 'parentId')
    parent?: Comment;

    @HasMany(() => Comment, 'parentId')
    replies?: Comment[];

    @CreatedAt
    @Column
    declare createdAt: Date;
}