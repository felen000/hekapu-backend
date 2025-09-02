import {
    Table,
    Column,
    Model,
    BelongsTo,
    AllowNull,
    CreatedAt,
    UpdatedAt,
    ForeignKey,
    BelongsToMany, HasMany, Default
} from "sequelize-typescript";
import {User} from "./user.model.js";
import {Tag} from "./tag.js";
import {PostTag} from "./post-tag.model.js";
import {Rating} from "./rating.model.js";
import {Comment} from "./comment.model.js";

export interface PostCreateAttrs {
    title: string,
    image: string | null,
    content: string,
    userId: number
}

export interface PostUpdateAttrs {
    title?: string,
    image?: string,
    content?: string,
}

@Table
export class Post extends Model<Post, PostCreateAttrs> {
    @AllowNull(false)
    @Column
    title!: string;

    @AllowNull(true)
    @Column
    image!: string;

    @Column
    content!: string;

    @Default(0)
    @Column
    rating!: number;

    @ForeignKey(() => User)
    userId!: number;

    @BelongsTo(() => User)
    user!: Awaited<User>;

    @BelongsToMany(() => Tag, {
        through: () => PostTag,
        as: 'tags'
    })
    tags?: Tag[];

    @BelongsToMany(() => Tag, {
        through: () => PostTag,
        as: 'filterTags'
    })
    filterTags?: Tag[];

    @HasMany(() => Rating)
    ratings?: Rating[];

    @HasMany(() => Comment)
    comments?: Comment[];

    @CreatedAt
    @Column
    declare createdAt: Date;

    @UpdatedAt
    @Column
    declare updatedAt: Date;
}