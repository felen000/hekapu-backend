import {Request, Response, NextFunction} from "express";
import {ApiError} from "../exceptions/api-error.js";

export default function activatedMiddleware(req: Request, res: Response, next: NextFunction) {
    if (!req.user.isActivated) {
        return next(ApiError.ForbiddenError('Аккаунт не активирован.'));
    }

    next();
}