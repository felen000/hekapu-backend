import {Request, Response, NextFunction} from "express";
import subscriptionService from "../services/subscription.service.js";
import {
    GetFollowersParams, GetFollowingsParams,
    SubscribeParams,
    UnsubscribeParams
} from "../types/subscriptions/subscriptions-request.type.js";
import {
    GetFollowersResponse,
    GetFollowingsResponse,
    SubscribeResponse
} from "../types/subscriptions/subscriptions-response.type.js";

class SubscriptionController {
    async subscribe(
        req: Request<SubscribeParams>,
        res: Response<SubscribeResponse>,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            const currentUserId = req.user.id;
            const targetUserId = +req.params.userId;
            const subscription = await subscriptionService.subscribe(currentUserId, targetUserId);
            return res.status(201).json(subscription);
        } catch (e) {
            next(e);
        }
    }

    async unsubscribe(
        req: Request<UnsubscribeParams>,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            const currentUserId = req.user.id;
            const targetUserId = +req.params.userId;
            await subscriptionService.unsubscribe(currentUserId, targetUserId);
            return res.status(204).send();
        } catch (e) {
            next(e);
        }
    }

    async getFollowers(
        req: Request<GetFollowersParams>,
        res: Response<GetFollowersResponse>,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            const userId = +req.params.userId;
            const followers = await subscriptionService.getFollowers(userId);
            return res.status(200).json(followers);
        } catch (e) {
            next(e);
        }
    }

    async getFollowings(
        req: Request<GetFollowingsParams>,
        res: Response<GetFollowingsResponse>,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            const userId = +req.params.userId;
            const followings = await subscriptionService.getFollowings(userId);
            return res.status(200).json(followings);
        } catch (e) {
            next(e);
        }
    }
}

export default new SubscriptionController();