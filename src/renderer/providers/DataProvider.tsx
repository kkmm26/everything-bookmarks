import React from "react";
import { buildFolderTree, transformFolders } from "../utils";

export const DataContext = React.createContext(undefined);

export function DataProvider({ children }: any) {
    const [items, setItems] = React.useState([]);

    const fetchFromDb = async () => {
        try {
            const res = await window.api.getAllFoldersWithBookmarks();
            const data = JSON.parse(res);
            setItems(transformFolders(buildFolderTree(data)));
        } catch (error) {
            console.error("Error fetching folders:", error);
        }
    };

    const saveNewBookmark = async (name: string, url: string, description: string, folderId: number) => {
        try {
            window.api.saveBookmark(name, url, description, folderId);
            await fetchFromDb();
        } catch (error) {
            console.error("Error adding new link:", error);
        }
    }

    const createNewFolder = async (
        name: string,
        parentFolderId: number | null = null
    ) => {
        try {
            await window.api.createFolder(name, parentFolderId);
            await fetchFromDb()
        } catch (error) {
            console.error("Error adding new folder:", error);
        }
    };

    const contextValue = { items, fetchFromDb, createNewFolder };

    return (
        <DataContext.Provider value={contextValue}>
            {children}
        </DataContext.Provider>
    );
}
