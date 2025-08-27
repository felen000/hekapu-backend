import postRepository from "../repository/post.repository.js";
import {ApiError} from "../exceptions/api-error.js";
import ratingRepository from "../repository/rating.repository.js";
import {Rating} from "../db/models/rating.model.js";
import {sequelize} from "../db/index.js";
import {Transaction} from "sequelize";

class RatingService {
    async ratePost(userId: number, postId: number, rate: number): Promise<Rating> {
        return await sequelize.transaction(async (t: Transaction) => {
            const post = await postRepository.findPostById(postId);
            if (!post) {
                throw ApiError.NotFoundError('Указанный пост не найден.');
            }

            let [rating, created] = await ratingRepository.findOrCreate(postId, userId, rate, t);

            if (!created) {
                const diff = rate - rating.rate;
                rating = await rating.update({rate}, {transaction: t});
                await postRepository.incrementRating(postId, diff, t);
            } else {
                await postRepository.incrementRating(postId, rate, t);
            }

            return rating;
        });
    }

    async deleteRating(userId: number, postId: number): Promise<void> {
        return await sequelize.transaction(async (t: Transaction) => {
            const rating = await ratingRepository.findRating(postId, userId);
            if (!rating) {
                throw ApiError.NotFoundError('Оценка не найдена.');
            }

            await ratingRepository.deleteRating(postId, userId, t);
            await postRepository.incrementRating(postId, -rating.rate, t);
        });

    }
}

export default new RatingService();