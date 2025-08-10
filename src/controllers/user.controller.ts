import {User} from "../db/models/user.model.js";
import {NextFunction, Request, Response} from "express";
import userService from "../services/user.service.js";

class UserController {
    async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<User[] | void> {
        try {
            const users = await userService.getAllUsers()
        } catch (e) {
            next(e)
        }
    }
}