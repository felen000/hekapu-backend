import {AlternativeValidationError, FieldValidationError} from "express-validator";

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

    static UnauthorizedError(message: string = 'Требуется авторизация. Токен не передан или недействителен.') {
        return new ApiError("UNAUTHORIZED", 401, message);
    }

    static ForbiddenError(message: string = "Недостаточно прав для выполнения операции.") {
        return new ApiError("FORBIDDEN", 403, message);
    }

    static NotFoundError(message: string = "Запрашиваемый ресурс не найден.") {
        return new ApiError("NOT_FOUND", 404, message);
    }

    static InternalServerError(message: string = "Внутренняя ошибка сервера.") {
        return new ApiError("INTERNAL_SERVER_ERROR", 500, message);
    }

    static ValidationError(errors: AlternativeValidationError[] | FieldValidationError[]) {
        console.log(errors);
        const details: Record<string, string> = {};
        if ((errors[0] as AlternativeValidationError)?.nestedErrors) {
            for (const error of (errors[0] as AlternativeValidationError).nestedErrors) {
                details[error.path] = error.msg;
            }
        } else {
            for (const error of errors as FieldValidationError[]) {
                details[error.path] = error.msg;
            }
        }
        return new ApiError("VALIDATION_ERROR", 422, "Некоторые поля содержат некорректные данные", details);
    }

    static BadRequestError(message: string, details: Record<string, string> | null = null) {
        return new ApiError("BAD_REQUEST", 400, message, details);
    }
}