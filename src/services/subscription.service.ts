import {UserSubscription} from "../db/models/user-subscription.model.js";
import userSubscriptionRepository from "../repository/user-subscription.repository.js";
import {ApiError} from "../exceptions/api-error.js";
import userRepository from "../repository/user.repository.js";
import UserDto from "../dtos/user/user.dto.js";

class SubscriptionService {
    async subscribe(currentUserId: number, targetUserId: number): Promise<UserSubscription> {
        if (currentUserId === targetUserId) {
            throw ApiError.BadRequestError('Нельзя подписаться на самого себя.');
        }
        return await userSubscriptionRepository.createSubscription(currentUserId, targetUserId);
    }

    async unsubscribe(currentUserId: number, targetUserId: number): Promise<void> {
        const deleted = await userSubscriptionRepository.removeSubscription(currentUserId, targetUserId);
        if (deleted === 0) {
            throw ApiError.NotFoundError('Подписка не найдена.');
        }
    }

    async getFollowers(userId: number): Promise<{ followers: UserDto[], followerCount: number }> {
        const followers = await userRepository.getFollowers(userId);
        return {
            followers: followers.followers.map(follower => new UserDto(follower)),
            followerCount: followers.followerCount
        };
    }

    async getFollowings(userId: number): Promise<{ followings: UserDto[], followingCount: number }> {
        const followings = await userRepository.getFollowings(userId);
        return {
            followings: followings.followings.map(following => new UserDto(following)),
            followingCount: followings.followingCount
        };
    }
}

export default new SubscriptionService();