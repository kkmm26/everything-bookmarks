import path from "path";
import knex from "knex";
import { app } from "electron";
import { Sequelize } from "sequelize";

const userPath = app.getPath("userData");
const dbPath = path.join(userPath, "bookmarks.sqlite");

const database = new Sequelize({
    dialect: "sqlite",
    storage: dbPath,
});

export const saveBookmark = async (title: string) => {
    try {
        await database.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
    console.log(userPath);
    console.log(title);
};
