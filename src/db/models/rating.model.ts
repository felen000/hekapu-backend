import {Table, Column, Model, ForeignKey, AllowNull} from "sequelize-typescript";
import {User} from "./user.model.js";
import {Post} from "./post.model.js";

interface RatingCreationAttrs {
    userId: number,
    postId: number,
    rate: number
}

@Table
export class Rating extends Model<Rating, RatingCreationAttrs> {
    @ForeignKey(() => User)
    @Column
    userId!: number;

    @ForeignKey(() => Post)
    @Column
    postId!: number;

    @AllowNull(false)
    @Column
    rate!: number;
}