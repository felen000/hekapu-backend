import {ApiError} from "../exceptions/api-error.js";
import bcrypt from "bcrypt";
import {v4} from "uuid";
import UserDto from "../dtos/user/user.dto.js";
import tokenService from "./token.service.js";
import userService from "./user.service.js";
import mailService from "./mail.service.js";

class AuthService {
    async register(email: string, password: string) {
        const candidate = await userService.getUserByEmail(email)
        if (candidate) {
            throw ApiError.BadRequestError("Пользователь с такой почтой уже существует.");
        }
        const hash = await bcrypt.hash(password, 7);
        const link = v4();
        const username = email.split("@")[0];
        const user = await userService.createUser({email: email, password: hash, name: username, activationLink: link});

        await mailService.sendActivationMail(email, link);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({userId: user.id, isActivated: user.isActivated});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        };
    }

    async login(email: string, password: string) {
        const user = await userService.getUserByEmail(email)
        if (!user) {
            throw ApiError.UnauthorizedError("Неверный логин или пароль");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw ApiError.UnauthorizedError("Неверный логин или пароль");
        }

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({userId: user.id, isActivated: user.isActivated});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        };
    }

    async logout(refreshToken: string) {
        await tokenService.deleteRefreshToken(refreshToken);
    }

    async activate(activationLink: string) {
        const user = await userService.getUserByActivationLink(activationLink);
        if (!user) {
            throw ApiError.NotFoundError('Ссылка активации недействительна или пользователь не найден.');
        }

        if (user.isActivated) {
            throw ApiError.BadRequestError("Пользователь уже активирован.");
        }

        await userService.activateUser(user.id);
    }

    async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError('Неверный токен.')
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.getTokenByValue(refreshToken)
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError('Неверный токен.')
        }

        const user = await userService.getUserById(userData.userId)
        if (!user) {
            throw ApiError.UnauthorizedError('Неверный токен.')
        }

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({userId: user.id, isActivated: user.isActivated});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto};
    }
}

export default new AuthService();