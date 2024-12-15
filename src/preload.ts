import { contextBridge, ipcRenderer } from "electron"

const api = {
    saveBookmark: () => {
        ipcRenderer.send('save-bookmark')
    },
    getAllBookmarks: () => {
        ipcRenderer.send('get-all-bookmarks')
    },
    createFolder: (name: string, parentFolderId: number) => {
        ipcRenderer.send('create-folder', name, parentFolderId)
    },
    getAllFolders: () => {
        ipcRenderer.send('get-all-folders')
    }
} as const

contextBridge.exposeInMainWorld('api', api)

export type api = typeof api