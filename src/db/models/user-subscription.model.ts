import {Table, Column, Model, HasMany, ForeignKey} from "sequelize-typescript";
import {User} from "./user.model.js";

@Table
export class UserSubscription extends Model {
    @ForeignKey(()=>User)
    @Column({field:'follower_id'})
    followerId!: number;

    @ForeignKey(()=>User)
    @Column({field:'following_id'})
    followingId!: number;
}