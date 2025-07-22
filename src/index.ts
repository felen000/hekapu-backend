import express from 'express';
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import sequelize from "./db.js";
import db_models from "./db_models/models.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => {
            console.log('http://localhost:' + PORT);
        });

    } catch (e) {
        console.error(e);
    }
};

start();