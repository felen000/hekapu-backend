import {Token, TokenAttrs} from "../db/models/token.js";

class TokenRepository {
    async createToken(token: TokenAttrs): Promise<Token> {
        return await Token.create(token);
    }

    async updateToken(token: TokenAttrs):Promise<Token>  {
        const updateResult = await Token.update({refreshToken: token.refreshToken}, {
            where: {userId: token.userId},
            returning: true
        });
        return updateResult[1][0]
    }

    async deleteToken(refreshToken: string) : Promise<void> {
        await Token.destroy({where: {refreshToken}});
    }

    async findTokenByValue(refreshToken: string): Promise<Token | null> {
        return await Token.findOne({where: {refreshToken}});
    }

    async findTokenByUserId(userId: number): Promise<Token | null> {
        return await Token.findOne({where: {userId}});
    }
}

export default new TokenRepository();