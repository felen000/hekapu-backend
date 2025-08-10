import express from 'express';
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import path from 'path';
import {fileURLToPath} from 'url';

import {sequelize} from "./db/index.js";
import authRouter from "./router/auth.router.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import postRouter from "./router/post.router.js";
import {Post} from "./db/models/post.model.js";
import {Role} from "./db/models/role.model.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(fileUpload());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.resolve(__dirname, '../public');
app.use('/public',express.static(publicPath));

app.use('/auth', authRouter);
app.use('/posts', postRouter);
app.use(errorMiddleware);

(async () => {
    try {
        await sequelize.sync({force: false});
        // await Role.create({name: 'USER'});
        // await Post.destroy({truncate: true, cascade: true});
        // for (let i = 0; i < 100; i++) {
            // const post = await Post.create({title: 'Title'+i, userId:1, content:'fijiiiiiiiie', image: null})
            // post.update({rating: Math.floor(Math.random() * 100)});
        // }
        app.listen(PORT, () => {
            console.log('http://localhost:' + PORT);
        });

    } catch (e) {
        console.error(e);
    }
})();


