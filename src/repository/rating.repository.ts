import {Rating} from "../db/models/rating.model.js";
import {Transaction} from "sequelize";

class RatingRepository {
    async findOrCreate(postId: number, userId: number, rate: number, transaction: Transaction): Promise<[Rating, boolean]> {
        return await Rating.findOrCreate({
            where: {postId, userId},
            defaults: {postId, userId, rate},
            transaction,
        });

    }

    async findRating(postId: number, userId: number, transaction?: Transaction): Promise<Rating | null> {
        return await Rating.findOne({where: {postId, userId}, transaction});
    }

    async deleteRating(postId: number, userId: number, transaction?: Transaction): Promise<number> {
        return await Rating.destroy({where: {postId, userId}, transaction});
    };
}

export default new RatingRepository();