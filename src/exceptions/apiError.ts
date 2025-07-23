import {FieldValidationError} from "express-validator";

export class ApiError extends Error {
    code: string;
    status: number;
    details: Record<string, string> | null;

    constructor(code: string, status: number, message: string, details: Record<string, string> | null = null) {
        super(message);
        this.code = code;
        this.status = status;
        this.details = details;
    }

    static UnauthorizedError() {
        return new ApiError("UNAUTHORIZED", 401, "Требуется авторизация. Токен не передан или недействителен.");
    }

    static ForbiddenError() {
        return new ApiError("FORBIDDEN", 403, "Недостаточно прав для выполнения операции.");
    }

    static NotFoundError(message: string = "Запрашиваемый ресурс не найден.") {
        return new ApiError("NOT_FOUND", 404, message);
    }

    static ValidationError(errors: FieldValidationError[]) {
        const details: Record<string, string> = {};
        errors.forEach(err => {
            details[err.path] = err.msg;
        });
        return new ApiError("VALIDATION_ERROR", 422, "Некоторые поля содержат некорректные данные", details);
    }

    static BadRequestError(message: string, details: Record<string, string> | null = null) {
        return new ApiError("BAD_REQUEST", 400, message, details);
    }
}