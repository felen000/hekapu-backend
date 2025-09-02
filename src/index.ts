import "dotenv/config";
import {sequelize} from "./db/index.js";
import app from "./app.js";

const PORT = +process.env.PORT! || 3000;

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