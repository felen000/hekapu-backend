import {UserSubscription} from "../db/models/user-subscription.model.js";

class UserSubscriptionRepository {
    async createSubscription(followerId: number, followingId: number): Promise<UserSubscription> {
        return await UserSubscription.create({followerId, followingId});
    }

    async removeSubscription(followerId: number, followingId: number): Promise<number> {
        return await UserSubscription.destroy({where: {followerId, followingId}});
    }
}

export default new UserSubscriptionRepository()