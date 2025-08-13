import {NextFunction, Request, Response} from "express";
import {ApiError} from "../exceptions/api-error.js";
import userService from "../services/user.service.js";

export default function roleMiddleware(...roles: string[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.user) {
                return next(ApiError.UnauthorizedError());
            }

            const user = await userService.getUserById(req.user.id);
            if (!user) {
                return next(ApiError.UnauthorizedError());
            }
            const userRoles = await user.$get('roles');
            const roleNames = userRoles.map(role => role.name);
            let hasRole = roles.some(role => roleNames.includes(role));
            if (!hasRole) {
                next(ApiError.ForbiddenError());
            }

            next();
        } catch (e) {
            next(e);
        }
    };
}