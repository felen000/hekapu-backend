import {AllowNull, BelongsTo, Column, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "./user.model.js";

export interface TokenAttrs {
    refreshToken: string,
    userId: number,
}

@Table
export class Token extends Model<Token,TokenAttrs> {
    @AllowNull(false)
    @Column
    refreshToken!: string;

    @AllowNull(false)
    @ForeignKey(() => User)
    @Column
    userId!: number;

}