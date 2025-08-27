import {
    Table,
    Column,
    Model,
    HasMany,
    ForeignKey,
    BelongsTo,
    CreatedAt,
    AllowNull,
    DataType
} from "sequelize-typescript";
import {Post} from "./post.model.js";
import {User} from "./user.model.js";

export interface CommentCreationAttrs {
    postId: number;
    userId: number;
    content: string;
    parentId: number | null;
}

@Table
export class Comment extends Model<Comment, CommentCreationAttrs> {
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
    @Column(DataType.INTEGER)
    parentId?: number | null;

    @BelongsTo(() => Comment, 'parentId')
    parent?: Comment;

    @HasMany(() => Comment, 'parentId')
    replies?: Comment[];

    @CreatedAt
    @Column
    declare createdAt: Date;
}