import {User, UserCreationAttrs} from "../db/models/user.model.js";
import {Role} from "../db/models/role.model.js";
import userRepository from "../repository/user.repository.js";
import {Post} from "../db/models/post.model.js";

class UserService {
    async createUser(userData: UserCreationAttrs): Promise<User> {
        return await userRepository.createUser(userData);
    }

    async activateUser(id: number): Promise<void> {
        await userRepository.updateUserById(id, {isActivated: true});
    }

    async getAllUsers(): Promise<{ users:User[], userCount: number }> {
        return await userRepository.getAllUsers()
    }

    async getUserById(id: number): Promise<User | null> {
        return await userRepository.findUserById(id);
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return await userRepository.findUserByEmail(email);
    }

    async getUserByActivationLink(activationLink: string): Promise<User | null> {
        return await userRepository.findUserByActivationLink(activationLink);
    }

    async updateUserById(id: number, userData: Partial<User>): Promise<User|null> {
       return await userRepository.updateUserById(id, userData);
    }

    async deleteUserById(id: number): Promise<boolean> {
        const deletedRowsCount = await userRepository.deleteUserById(id);
        return deletedRowsCount > 0
    }
}

export default new UserService();