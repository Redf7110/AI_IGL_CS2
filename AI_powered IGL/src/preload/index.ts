import { contextBridge, ipcRenderer } from "electron"

contextBridge.exposeInMainWorld("api", {
  onReplay: (callback: (images: string[]) => void) =>
    ipcRenderer.on("replay-triggered", (_, images) => callback(images))
})
