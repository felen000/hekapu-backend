import {Order} from "sequelize";

export interface PostsReceivingOptions {
    limit?: number;
    offset?: number;
    order?: Order;
    userId?: number
    currentUserId?: number
    tags?: string[]
}