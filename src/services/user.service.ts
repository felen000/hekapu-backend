import {User, UserCreationAttrs} from "../db/models/user.model.js";
import userRepository from "../repository/user.repository.js";
import {ApiError} from "../exceptions/api-error.js";
import UserDto from "../dtos/user/user.dto.js";

class UserService {
    async createUser(userData: UserCreationAttrs): Promise<User> {
        return await userRepository.createUser(userData);
    }

    async activateUser(id: number): Promise<void> {
        const user = await userRepository.findUserById(id);
        if (!user) {
            throw ApiError.NotFoundError('Указанный пользователь не существует.');
        }
        await userRepository.updateUserById(id, {isActivated: true});
    }

    async getAllUsers(): Promise<{ users: User[], userCount: number }> {
        return await userRepository.getAllUsers();
    }

    async getUserById(id: number): Promise<User> {
        const user = await userRepository.findUserById(id);
        if (!user) {
            throw ApiError.NotFoundError('Указанный пользователь не существует.');
        }
        return user;
    }

    async getUserByEmail(email: string): Promise<User> {
        const user = await userRepository.findUserByEmail(email);
        if (!user) {
            throw ApiError.NotFoundError('Указанный пользователь не существует.');
        }
        return user;
    }

    async getUserByActivationLink(activationLink: string): Promise<User> {
        const user = await userRepository.findUserByActivationLink(activationLink);
        if (!user) {
            throw ApiError.NotFoundError('Указанный пользователь не существует.');
        }
        return user;
    }

    async updateUserById(id: number, userData: Partial<User>): Promise<UserDto> {
        const user = await userRepository.findUserById(id);
        if (!user) {
            throw ApiError.NotFoundError('Указанный пользователь не существует.');
        }
        const updatedUser = await userRepository.updateUserById(id, userData);
        return new UserDto(updatedUser)
    }

    async deleteUserById(id: number): Promise<boolean> {
        const user = await userRepository.findUserById(id);
        if (!user) {
            throw ApiError.NotFoundError('Указанный пользователь не существует.');
        }
        const deletedRowsCount = await userRepository.deleteUserById(id);
        return deletedRowsCount > 0;
    }

    async getUserProfile(userId: number): Promise<UserDto> {
        const user = await userRepository.getUserProfile(userId);
        if (!user) {
            throw ApiError.NotFoundError('Указанный пользователь не существует.');
        }
        return new UserDto(user);
    }
}

export default new UserService();