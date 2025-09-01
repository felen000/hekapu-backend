import {Request, Response, NextFunction} from "express";
import ratingService from "../services/rating.service.js";
import {FieldValidationError, validationResult} from "express-validator";
import {ApiError} from "../exceptions/api-error.js";
import {DeleteRatingParams, RatePostBody, RatePostParams} from "../types/ratings/ratings-request.type.js";
import {RatePostResponse} from "../types/ratings/ratings-response.type.js";

class RatingController {
    async ratePost(
        req: Request<RatePostParams, {}, RatePostBody>,
        res: Response<RatePostResponse>,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            const result = validationResult(req);
            if (!result.isEmpty()) {
                return next(ApiError.ValidationError(result.array() as FieldValidationError[]));
            }
            const postId = +req.params.postId;
            const userId = req.user.id;
            const ratingValue = req.body.rating;
            const rating = await ratingService.ratePost(userId, postId, ratingValue);
            res.status(200).json(rating);
        } catch (e) {
            next(e);
        }
    }

    async deleteRating(
        req: Request<DeleteRatingParams>,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            const postId = +req.params.postId;
            const userId = req.user.id;
            await ratingService.deleteRating(userId, postId);
            res.status(204).send();
        } catch (e) {
            next(e);
        }
    }
}

export default new RatingController();