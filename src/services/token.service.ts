import jwt from "jsonwebtoken";
import {Token} from "../db/models/token.js";
import tokenRepository from "../repository/token.repository.js";

interface Tokens {
    accessToken: string,
    refreshToken: string,
}

interface TokenPayload {
    userId: number
    isActivated: boolean
}

class TokenService {
    generateTokens(payload: TokenPayload): Tokens {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {expiresIn: '15d'});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {expiresIn: '15d'});

        return {
            accessToken,
            refreshToken,
        };
    }

    async saveToken(userId: number, refreshToken: string): Promise<Token> {
        const tokenFromDb = await tokenRepository.findTokenByUserId(userId);
        if (tokenFromDb) {
            const updatedToken = await tokenRepository.updateToken({refreshToken, userId},);
            return updatedToken;
        }

        const newToken = await tokenRepository.createToken({refreshToken, userId});
        return newToken;
    }

    validateRefreshToken(refreshToken: string): TokenPayload | null {
        try {
            const userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as TokenPayload;
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateAccessToken(refreshToken: string): TokenPayload | null {
        try {
            const userData = jwt.verify(refreshToken, process.env.JWT_ACCESS_SECRET!) as TokenPayload;
            return userData;
        } catch (e) {
            return null;
        }
    }

    async deleteRefreshToken(refreshToken: string): Promise<void> {
        await tokenRepository.deleteToken(refreshToken);
    }

    async getTokenByValue(refreshToken: string): Promise<Token | null> {
        return await tokenRepository.findTokenByValue(refreshToken);
    }

    async getTokenByUserId(userId: number): Promise<Token | null> {
        return await tokenRepository.findTokenByUserId(userId);
    }
}

export default new TokenService();