import {Table, Column, Model, BelongsToMany, AllowNull, Unique} from "sequelize-typescript";
import {User} from "./user.model.js";
import {UserRole} from "./user.role.js";

interface RoleCreationAttrs {
    name: string
}

@Table
export class Role extends Model<Role, RoleCreationAttrs> {
    @AllowNull(false)
    @Unique
    @Column
    name!: string;

    @BelongsToMany(() => User, () => UserRole)
    users?: User[];
}