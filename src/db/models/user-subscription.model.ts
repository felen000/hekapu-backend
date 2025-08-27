import {Table, Column, Model, ForeignKey} from "sequelize-typescript";
import {User} from "./user.model.js";

interface UserSubscriptionCreationAttrs {
    followerId: number,
    followingId: number
}

@Table
export class UserSubscription extends Model<UserSubscription, UserSubscriptionCreationAttrs> {
    @ForeignKey(() => User)
    @Column
    followerId!: number;

    @ForeignKey(() => User)
    @Column
    followingId!: number;
}