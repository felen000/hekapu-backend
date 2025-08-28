import {NextFunction, Request, Response} from "express";
import authService from "../services/auth.service.js";
import {AlternativeValidationError, validationResult} from "express-validator";
import {ApiError} from "../exceptions/api-error.js";
import {
    ActivateParams,
    LoginBody,
    RefreshRequest, RegisterBody
} from "../types/auth/auth-request.types.js";
import {AuthResult} from "../types/auth/auth-response.types.js";
import {REFRESH_COOKIE_OPTIONS} from "../constants/index.js";

class AuthController {
    async register(
        req: Request<{}, {}, RegisterBody>,
        res: Response<AuthResult>,
        next: NextFunction
    ): Promise<Response<AuthResult> | void> {
        try {
            const result = validationResult(req);
            if (!result.isEmpty()) {
                return next(ApiError.ValidationError(result.array() as AlternativeValidationError[]));
            }
            const {email, password} = req.body;
            const authData = await authService.register(email, password);
            res.cookie('refreshToken', authData.refreshToken, REFRESH_COOKIE_OPTIONS);
            return res.status(201).json({accessToken: authData.accessToken, user: authData.user});
        } catch (e) {
            next(e);
        }
    }

    async login(
        req: Request<{}, {}, LoginBody>,
        res: Response<AuthResult>,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            const result = validationResult(req);
            if (!result.isEmpty()) {
                return next(ApiError.ValidationError(result.array() as AlternativeValidationError[]));
            }
            const {email, password} = req.body;
            const authData = await authService.login(email, password);
            res.cookie('refreshToken', authData.refreshToken, REFRESH_COOKIE_OPTIONS);
            return res.status(200).json({accessToken: authData.accessToken, user: authData.user});
        } catch (e) {
            next(e);
        }
    }

    async logout(req: RefreshRequest, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const {refreshToken} = req.cookies;
            await authService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.status(204).send();
        } catch (e) {
            next(e);
        }
    }

    async activate(req: Request<ActivateParams>, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const {link} = req.params;
            await authService.activate(link);
            return res.redirect(process.env.CLIENT_URL!);
        } catch (e) {
            next(e);
        }
    }

    async refresh(
        req: RefreshRequest,
        res: Response<AuthResult>,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            const {refreshToken} = req.cookies;
            const authData = await authService.refresh(refreshToken);
            res.cookie('refreshToken', authData.refreshToken, REFRESH_COOKIE_OPTIONS);
            return res.json({accessToken: authData.accessToken, user: authData.user});
        } catch (e) {
            next(e);
        }
    }
}

export default new AuthController();