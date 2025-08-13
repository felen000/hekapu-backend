import {
    Table,
    Column,
    Model,
    HasMany,
    BelongsToMany,
    Unique,
    AllowNull,
    Default,
    HasOne,
    DefaultScope, DataType
} from "sequelize-typescript";
import {Role} from "./role.model.js";
import {UserRole} from "./user.role.js";
import {Post} from "./post.model.js";
import {Rating} from "./rating.model.js";
import {Comment} from "./comment.model.js";
import {UserSubscription} from "./user-subscription.model.js";
import {Token} from "./token.js";

export interface UserCreationAttrs {
    email: string;
    password: string;
    name: string;
    activationLink: string;
}

@Table
export class User extends Model<User, UserCreationAttrs> {
    @Unique
    @AllowNull(false)
    @Column({type: DataType.STRING})
    email!: string;

    @AllowNull(false)
    @Column({type: DataType.STRING})
    password!: string;

    @AllowNull(false)
    @Column({type: DataType.STRING})
    name!: string;

    @Default(false)
    @Column({type: DataType.BOOLEAN})
    isActivated!: boolean;

    @Column({type: DataType.STRING})
    activationLink!: string;

    @Column({type: DataType.STRING})
    profilePicture!: string;

    @BelongsToMany(() => Role, () => UserRole)
    roles?: Role[];

    @HasMany(() => Post, {onDelete: 'CASCADE'})
    posts?: Post[];

    @HasMany(() => Rating)
    ratings?: Rating[];

    @HasMany(() => Comment)
    comments?: Comment[];

    @HasOne(()=>Token)
    token?: Token;

    @BelongsToMany(() => User, {
        through: () => UserSubscription,
        foreignKey: 'following_id',
        otherKey: 'follower_id',
        as: 'followers'
    })
    followers?: User[];

    @BelongsToMany(() => User, {
        through: () => UserSubscription,
        foreignKey: 'follower_id',
        otherKey: 'following_id',
        as: 'following'
    })
    following?: User[];
}