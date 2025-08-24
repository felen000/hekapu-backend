import {Request, Response, NextFunction} from "express";
import ratingService from "../services/rating.service.js";
import {FieldValidationError, validationResult} from "express-validator";
import {ApiError} from "../exceptions/api-error.js";

class RatingController {
    async ratePost(req: Request<{ postId: string }, {}, {
        rating: number
    }>, res: Response, next: NextFunction): Promise<Response | void> {
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

    async deleteRating(req: Request<{ postId: string }>, res: Response, next: NextFunction): Promise<Response<{
        isDeleted: boolean
    }> | void> {
        try {
            const postId = +req.params.postId;
            const userId = req.user.id;
            const isDeleted = await ratingService.deleteRating(userId, postId);
            res.status(200).json({isDeleted});
        } catch (e) {
            next(e);
        }
    }
}

export default new RatingController();