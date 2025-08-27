import {NextFunction, Response, Request} from "express";
import {ApiError} from "../exceptions/api-error.js";
import tokenService from "../services/token.service.js";

export default function authMiddleware(options?: { required?: boolean }) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const required = options?.required ?? true;
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                if (!required) return next();
                return next(ApiError.UnauthorizedError('Токен отсутствует'));
            }

            const accessToken = authHeader.split(' ')[1];
            if (!accessToken) {
                if (!required) return next();
                return next(ApiError.UnauthorizedError('Неверный формат токена'));
            }

            const userData = tokenService.validateAccessToken(accessToken);
            if (!userData?.userId) {
                if (!required) return next();
                return next(ApiError.UnauthorizedError('Токен недействителен'));
            }

            req.user = {id: userData.userId, isActivated: userData.isActivated};
            next();
        } catch (e) {
            if (!required) return next();
            next(ApiError.UnauthorizedError("Ошибка авторизации"));
        }
    };
}