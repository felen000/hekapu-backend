import {NextFunction, Response, Request} from "express";
import {ApiError} from "../exceptions/api-error.js";
import tokenService from "../services/token.service.js";

export default async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return next(ApiError.UnauthorizedError('Токен отсутствует'));
        }

        const accessToken = authHeader.split(' ')[1];
        if (!accessToken) {
            return next(ApiError.UnauthorizedError('Неверный формат токена'));
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData?.userId) {
            return next(ApiError.UnauthorizedError('Токен недействителен'));
        }

        req.user = {id: userData.userId};
        next();
    } catch (e) {
        next(ApiError.UnauthorizedError("Ошибка авторизации"));
    }

}