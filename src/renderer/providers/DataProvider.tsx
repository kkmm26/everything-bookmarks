import React from "react";
import { transformFolders } from "../utils";

export const DataContext = React.createContext(undefined);

export function DataProvider({ children }: any) {
    const [items, setItems] = React.useState([]);

    const fetchFolders = async () => {
        try {
            const res = await window.api.getAllFoldersWithBookmarks();
            const data = JSON.parse(res);
            setItems(transformFolders(data));
        } catch (error) {
            console.error("Error fetching folders:", error);
        }
    };

    const addNewFolder = async (
        name: string,
        parentFolderId: number | null = null
    ) => {
        try {
            await window.api.createFolder(name, parentFolderId);
            await fetchFolders()
        } catch (error) {
            console.error("Error adding new folder:", error);
        }
    };

    const contextValue = { items, fetchFolders, addNewFolder };

    return (
        <DataContext.Provider value={contextValue}>
            {children}
        </DataContext.Provider>
    );
}
