import express from 'express';
import "dotenv/config"
import cookieParser from "cookie-parser";
import cors from "cors";

const PORT = process.env.PORT || 3000;
const app = express()

app.use(express.json());
app.use(cookieParser());
app.use(cors())

const start = () => {
    try {
        app.listen(PORT, () => {
            console.log('http://localhost:' + PORT);
        })

    } catch (e) {
        console.error(e);
    }
}

start()