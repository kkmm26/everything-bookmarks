import { app, BrowserWindow, ipcMain } from "electron";
import { getAllBookmarks, saveBookmark } from "./data/models/bookmarks";
import { createFolder, getAllFolders } from "./data/models/folders";

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

ipcMain.on("save-bookmark", async () => {
    await saveBookmark("testing title", "testing url").then((bookmark) => {
        console.log("bookmark saved!", bookmark);
    });
});
ipcMain.on("get-all-bookmarks", async () => {
    await getAllBookmarks().then((bookmarks) => {
        console.log("bookmarks fetched!", bookmarks);
        console.log(JSON.stringify(bookmarks, null, 2));
    });
});
ipcMain.on("create-folder", async (_, name: string, parentFolderId: number) => {
    await createFolder(name, parentFolderId).then((folder) => {
        console.log("bookmark created!", folder);
    });
});
ipcMain.on("get-all-folders", async () => {
    await getAllFolders().then((folders) => {
        console.log("folders fetched!", folders);
        console.log(JSON.stringify(folders, null, 2));
    });
});
