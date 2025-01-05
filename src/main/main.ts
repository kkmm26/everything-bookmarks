import { app, BrowserWindow, ipcMain } from "electron";
import { getAllBookmarks, saveBookmark } from "./data/models/bookmarks";
import {
    createFolder,
    getAllFoldersWithBookmarks,
} from "./data/models/folders";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
    app.quit();
}

const createWindow = (): void => {
    const mainWindow = new BrowserWindow({
        height: 600,
        width: 1200,
        webPreferences: {
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
        },
    });

    // and load the index.html of the app.
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
    mainWindow.webContents.openDevTools();
};

app.on("ready", createWindow);
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

ipcMain.on(
    "save-bookmark",
    async (
        _,
        title: string,
        url: string,
        description: string,
        folderId: number
    ) => {
        await saveBookmark(title, url, description, folderId).then(
            (bookmark) => {
                console.log("bookmark saved!", bookmark);
            }
        );
    }
);
ipcMain.on("get-all-bookmarks", async () => {
    await getAllBookmarks().then((bookmarks) => {
        console.log("bookmarks fetched!", bookmarks);
        return JSON.stringify(bookmarks);
    });
});
ipcMain.handle(
    "create-folder",
    async (_, name: string, parentFolderId: number) => {
        let res
        await createFolder(name, parentFolderId).then((folder) => {
            console.log("bookmark created!", folder);
            res = JSON.stringify(folder, null, 2);
        });
        return res;
    }
);
ipcMain.handle("get-all-folders-with-bookmarks", async () => {
    let data;
    await getAllFoldersWithBookmarks().then((folders) => {
        console.log("folders fetched!", folders);
        data = JSON.stringify(folders, null, 2);
    });
    return data;
});
