import "dotenv/config"
import {sequelize} from "../db/index.js";

beforeAll(async () => {
    await sequelize.sync({ force: true });
});

afterAll(async () => {
    await sequelize.close();
});
