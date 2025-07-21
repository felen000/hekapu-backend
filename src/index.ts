import express from 'express';
import "dotenv/config"

const PORT = process.env.PORT || 3000;
const app = express()

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