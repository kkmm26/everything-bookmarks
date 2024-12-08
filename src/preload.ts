import { contextBridge, ipcRenderer } from "electron"

const api = {
    saveBookmark: (title: string) => {
        ipcRenderer.send('save-bookmark', title)
    }
} as const

contextBridge.exposeInMainWorld('api', api)

export type api = typeof api