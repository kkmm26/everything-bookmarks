import { database } from "../database";
import { DataTypes } from "sequelize";

export const Bookmarks = database.define(
    "Bookmarks",
    {
        bookmarkId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        folderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    { freezeTableName: true }
);

export const saveBookmark = async (
    title: string,
    url: string,
    description: string,
    folderId: number
) => {
    try {
        const bookmark = await Bookmarks.create({
            title,
            url,
            description,
            folderId,
        });
        return bookmark;
    } catch (error) {
        console.error("Error saving bookmark:", error);
    }
};

export const getAllBookmarks = async () => {
    try {
        const bookmarks = await Bookmarks.findAll();
        return bookmarks;
    } catch (error) {
        console.log("Error getting bookmarks:", error);
    }
};
