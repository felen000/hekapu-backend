import {Sequelize} from 'sequelize-typescript';
import {Comment} from "./models/comment.model.js";
import {Post} from "./models/post.model.js";
import {User} from "./models/user.model.js";
import {PostTag} from "./models/post-tag.model.js";
import {Rating} from "./models/rating.model.js";
import {Role} from "./models/role.model.js";
import {Tag} from "./models/tag.js";
import {UserRole} from "./models/user.role.js";
import {UserSubscription} from "./models/user-subscription.model.js";
import {Token} from "./models/token.js";

export const sequelize = new Sequelize({
        database: process.env.DB_NAME!,
        username: process.env.DB_USER!,
        password: process.env.DB_PASSWORD,
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT!),
        models: [Comment, Post, User, PostTag, Rating, Role, Tag, UserRole, UserSubscription, Token],

    },
);