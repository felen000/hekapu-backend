import {Table, Column, Model, HasMany, ForeignKey, BelongsTo, AllowNull} from "sequelize-typescript";
import {User} from "./user.model.js";
import {Post} from "./post.model.js";

@Table
export class Rating extends Model<Rating> {
    @ForeignKey(() => User)
    @Column
    userId!: number;

    // @BelongsTo(() => User)
    // user?: User;

    @ForeignKey(() => Post)
    @Column
    postId!: number;

    // @BelongsTo(() => Post)
    // posts?: Post;
    @AllowNull(false)
    @Column
    rate!: number;
}