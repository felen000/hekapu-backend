import {User} from "../db/models/user.model.js";
import {NextFunction, Request, Response} from "express";
import userService from "../services/user.service.js";
import {
    PostsByUserRequestQuery,
    UpdateUserProfileBody,
    UsersRequestParams
} from "../types/users/users-request.type.js";
import {Post} from "../db/models/post.model.js";
import getOrderOptions from "../helpers/get-order-options.js";
import getOffset from "../helpers/get-offset.js";
import postService from "../services/post.service.js";
import {UploadedFile} from "express-fileupload";
import path from "path";
import {PROFILE_PICTURE_DIRECTORY} from "../constants/index.js";

class UserController {
    async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<Response<User[]> | void> {
        try {
            const users = await userService.getAllUsers();
            return res.status(200).json(users);
        } catch (e) {
            next(e);
        }
    }

    async getUserProfile(req: Request<UsersRequestParams>, res: Response, next: NextFunction): Promise<Response<User> | void> {
        try {
            const userId = +req.params.userId;
            const userProfile =  await userService.getUserProfile(userId)
            return res.status(200).json(userProfile);
        } catch (e) {
            next(e);
        }
    }

    async getPostsByUser(req: Request<UsersRequestParams, {}, {}, PostsByUserRequestQuery>, res: Response, next: NextFunction): Promise<Response<Post> | void> {
        try {
            const userId = +req.params.userId;
            const page = +req.query.page || 1;
            const limit = +req.query.limit || 10;
            const orderOptions = getOrderOptions(req.query.sort_by);
            const offset = getOffset(page, limit);
            const posts = await postService.getAllPosts({userId, offset, limit, order: orderOptions});
            return res.status(200).json(posts);
        } catch (e) {
            next(e);
        }
    }

    async updateUserProfile(req: Request<{}, {}, UpdateUserProfileBody>, res: Response, next: NextFunction): Promise<Response<User> | void> {
        try {
            const userId = req.user.id;
            const {name} = req.body;
            const profilePicture = req.files?.image as UploadedFile;
            let imagePath = '';
            if (profilePicture) {
                imagePath = '/public/' + profilePicture.name;
                await profilePicture.mv(path.join(PROFILE_PICTURE_DIRECTORY, profilePicture.name));
            }
            const user = await userService.updateUserById(userId, {
                name,
                profilePicture: imagePath ? process.env.API_URL! + imagePath : imagePath
            });
            return res.status(200).json(user);
        } catch (e) {
            next(e);
        }
    }

    async deleteUser(req: Request, res: Response, next: NextFunction): Promise<Response<{ isDeleted: boolean }> | void> {
        try {
            const userId = req.user.id;
            const isDeleted = await userService.deleteUserById(userId);
            return res.status(200).json({isDeleted});
        } catch (e) {
            next(e);
        }
    }
}

export default new UserController();