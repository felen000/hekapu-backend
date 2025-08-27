import express from 'express';
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import {sequelize} from "./db/index.js";
import authRouter from "./router/auth.router.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import postRouter from "./router/post.router.js";
import {PUBLIC_DIRECTORY} from "./constants/index.js";
import userRouter from "./router/user.router.js";
import tagRouter from "./router/tag.router.js";
import commentRouter from "./router/comment.router.js";
import ratingRouter from "./router/rating.router.js";
import subscriptionRouter from "./router/subscription.router.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(fileUpload());

app.use('/public', express.static(PUBLIC_DIRECTORY));

app.use('/auth', authRouter);
app.use('/posts', postRouter);
app.use('/users', userRouter);
app.use('/tags', tagRouter);
app.use(commentRouter);
app.use(ratingRouter);
app.use('/subscriptions', subscriptionRouter);
app.use(errorMiddleware);

(async () => {
    try {
        await sequelize.sync({force: false});
        // await Role.create({name: 'USER'});
        // for (let i = 0; i < 100; i++) {
        //     const post = await Post.create({title: 'Title'+i, userId:1, content:'fijiiiiiiiie', image: null})
        // }
        // await Rating.create({postId: 2, userId: 1, rate: -1})
        app.listen(PORT, () => {
            console.log('http://localhost:' + PORT);
        });

    } catch (e) {
        console.error(e);
    }
})();


