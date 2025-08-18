import {Order} from "sequelize";

export interface CommentsReceivingOptions {
    limit?: number;
    offset?: number;
    order?: Order;
    userId?: number
    postId?: number
}