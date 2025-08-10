import {Request, Response, NextFunction} from "express";
import {ApiError} from "../exceptions/api-error.js";
import {ErrorResponse} from "../types/error-response.type.js";

export default function (err: Error, req: Request, res: Response<ErrorResponse>, next: NextFunction) {
    console.error(err);

    if (err instanceof ApiError) {
        console.error(err.details);
        return res.status(err.status).json({
            error: {
                code: err.code,
                message: err.message,
                status: err.status,
                details: err.details
            }
        });
    }

    return res.status(500).json({
        error: {
            code: "INTERNAL_ERROR",
            message: "Что-то пошло не так.",
            status: 500,
            details: null
        }
    });
}