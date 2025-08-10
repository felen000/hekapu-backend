export interface ErrorResponse {
    error: {
        code: string;
        message: string;
        status: number;
        details: Record<string, string> | null;
    };
}