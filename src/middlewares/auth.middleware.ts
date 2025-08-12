import {NextFunction, Response, Request} from "express";
import {ApiError} from "../exceptions/api-error.js";
import tokenService from "../services/token.service.js";
import userService from "../services/user.service.js";

export default async function (req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return next(ApiError.UnauthorizedError());
    }

    const accessToken = authHeader.split(' ')[1];
    if (!accessToken) {
        return next(ApiError.UnauthorizedError());
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
        return next(ApiError.UnauthorizedError());
    }

    const user = await userService.getUserById(userData.userId);
    if (!user) {
        return next(ApiError.UnauthorizedError());
    }

    req.user = {id: user.id};
    next();

}