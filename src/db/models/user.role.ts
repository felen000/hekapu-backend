import {Table, Column, Model, HasMany, ForeignKey, DataType} from "sequelize-typescript";
import {User} from "./user.model.js";
import {Role} from "./role.model.js";

@Table
export class UserRole extends Model {
    @ForeignKey(()=>User)
    @Column(DataType.INTEGER)
    userId!: number;

    @ForeignKey(()=>Role)
    @Column(DataType.INTEGER)
    roleId!: number;
}