import { database } from "../database";
import { DataTypes } from "sequelize";
import { Bookmarks } from "./bookmarks";

export const Folders = database.define(
    "Folders",
    {
        folderId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        parentFolderId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    { freezeTableName: true }
);

Folders.hasMany(Folders, {
    foreignKey: "parentFolderId",
    as: "childFolders",
});
Folders.hasMany(Bookmarks, { foreignKey: "folderId", as: "bookmarks" });

export const createFolder = async (
    name: string,
    parentFolderId: number | null = null
) => {
    try {
        const folder = await Folders.create({ name, parentFolderId });
        return folder;
    } catch (error) {
        console.log("Error creating folder: ", error);
    }
};

export const getAllFoldersWithBookmarks = async () => {
    try {
        const folders = await Folders.findAll({
            include: [
                {
                    model: Folders,
                    as: "childFolders",
                    include: [{ model: Bookmarks, as: "bookmarks" }],
                },
                { model: Bookmarks, as: "bookmarks" },
            ],
        });
        return folders;
    } catch (error) {
        console.log("Error getting folders: ", error);
    }
};
