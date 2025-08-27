import {User, UserCreationAttrs} from "../db/models/user.model.js";
import {Role} from "../db/models/role.model.js";
import {Post} from "../db/models/post.model.js";
import {sequelize} from "../db/index.js";

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
        return await User.findOne({
            where: {id},
            include: [
                {
                    model: Post,
                    limit: 10,
                    attributes: {
                        include: [
                            [
                                sequelize.literal(`(
                              SELECT COUNT(*)
                              FROM "Comments" AS c
                              WHERE c."postId" = "Post"."id"
                            )`),
                                'commentCount'
                            ]
                        ]
                    },
                    order: [['createdAt', 'DESC']]
                }
            ]
        });
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

    async getAllUsers(): Promise<{ users: User[], userCount: number }> {
        const findResult = await User.findAndCountAll({attributes: ['id', 'name', 'profilePicture']});
        return {userCount: findResult.count, users: findResult.rows};
    }

    async getFollowers(userId: number): Promise<{ followers: User[], followerCount: number }> {
        const {rows, count} = await User.findAndCountAll({
            attributes: ['id', 'name', 'profilePicture'],
            include: [
                {
                    attributes: [],
                    association: 'following',
                    where: {id: userId},
                    through: {attributes: []},
                    required: true
                }
            ]
        });

        return {followers: rows, followerCount: count};
    }


    async getFollowings(userId: number): Promise<{ followings: User[], followingCount: number }> {
        const {rows, count} = await User.findAndCountAll({
            attributes: ['id', 'name', 'profilePicture'],
            include: [
                {
                    attributes: [],
                    association: 'followers',
                    where: {id: userId},
                    through: {attributes: []},
                    required: true
                }
            ]
        });

        return {followings: rows, followingCount: count};
    }
}

export default new UserRepository();