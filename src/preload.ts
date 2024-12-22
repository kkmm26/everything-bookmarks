import { contextBridge, ipcRenderer } from "electron";

const api = {
    saveBookmark: (
        title: string,
        url: string,
        description: string,
        folderId: number
    ) => {
        ipcRenderer.send("save-bookmark", title, url, description, folderId);
    },
    getAllBookmarks: () => {
        ipcRenderer.send("get-all-bookmarks");
    },
    createFolder: (name: string, parentFolderId: number | null = null) => {
        ipcRenderer.send("create-folder", name, parentFolderId);
    },
    getAllFoldersWithBookmarks: async ()  => {
        return await ipcRenderer.invoke("get-all-folders-with-bookmarks");
    },
} as const;

contextBridge.exposeInMainWorld("api", api);

export type api = typeof api;
