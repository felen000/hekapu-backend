import {User, UserCreationAttrs} from "../db/models/user.model.js";
import {Role} from "../db/models/role.model.js";
import {Post} from "../db/models/post.model.js";

class UserRepository {
    async createUser(userData: UserCreationAttrs): Promise<User> {
        const user = User.build({
            email: userData.email,
            password: userData.password,
            name: userData.name,
            activationLink: userData.activationLink
        });

        const role = await Role.findOne({where: {name: 'USER'}});
        if (!role) {
            throw new Error('Роль USER не найдена');
        }
        await user.save();
        await user.$add('roles', role);
        return user;
    }

    async findUserById(id: number): Promise<User | null> {
        return await User.findOne({where: {id}});
    }

    async getUserProfile(id: number): Promise<User | null> {
        return await User.findOne({where: {id}, include: [{model: Post, limit: 10, order: [['createdAt', 'DESC']]} ]});
    }

    async findUserByEmail(email: string): Promise<User | null> {
        return await User.findOne({where: {email}});
    }

    async findUserByActivationLink(activationLink: string): Promise<User | null> {
        return await User.findOne({where: {activationLink}});
    }

    async updateUserById(id: number, userData: Partial<User>): Promise<User> {
        const [_, [updatedUser]] = await User.update(userData, {where: {id}, returning: true});
        return updatedUser;
    }

    async deleteUserById(id: number): Promise<number> {
        return await User.destroy({where: {id}});
    }

    async getAllUsers(): Promise<{users: User[], userCount: number}> {
        const findResult =  await User.findAndCountAll({attributes: ['id', 'name', 'profilePicture']});
        return {userCount: findResult.count, users: findResult.rows};
    }
}

export default new UserRepository();