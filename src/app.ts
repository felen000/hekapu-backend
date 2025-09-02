import express from 'express';
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import authRouter from "./router/auth.router.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import postRouter from "./router/post.router.js";
import {PUBLIC_DIRECTORY} from "./constants/index.js";
import userRouter from "./router/user.router.js";
import tagRouter from "./router/tag.router.js";
import commentRouter from "./router/comment.router.js";
import ratingRouter from "./router/rating.router.js";
import subscriptionRouter from "./router/subscription.router.js";

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

export default app;



