import UserDto from "../../dtos/user/user.dto.js";
import {Request} from "express";

export interface RegisterBody {
    email: string,
    password: string
}

export interface LoginBody {
    email: string,
    password: string
}

export interface RefreshRequest extends Request {
    cookies: {
        refreshToken: string
    };
}

export interface ActivateParams {
    link: string
}

