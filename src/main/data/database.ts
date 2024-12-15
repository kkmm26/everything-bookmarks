import path from "path";
import { app } from "electron";
import { Sequelize } from "sequelize";

const userPath = app.getPath("userData");
const dbPath = path.join(userPath, "everything-bookmarks.sqlite");

export const database = new Sequelize({
    dialect: "sqlite",
    storage: dbPath,
});

const initializeDatabase = async () => {
    try {
        await database.authenticate();
        console.log("Connection has been established successfully.");
        await database.sync();
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
    console.log(userPath);
};

initializeDatabase();
