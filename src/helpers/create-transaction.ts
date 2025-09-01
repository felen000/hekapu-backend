import {sequelize} from "../db/index.js";
import {Transaction} from "sequelize";

export async function createTransaction<T>(cb: (t:Transaction)=>Promise<T>): Promise<T> {
    return await sequelize.transaction(cb);
}

