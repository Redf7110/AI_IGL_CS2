import { contextBridge, ipcRenderer } from "electron"

contextBridge.exposeInMainWorld("api", {
  ping: () => ipcRenderer.invoke("ping"),

  onMinimapUpdate: (cb: (img: string) => void) => {
    ipcRenderer.on("minimap-update", (_, img) => cb(img))
  },
  saveAudioClip: (data: ArrayBuffer, mimeType?: string) =>
    ipcRenderer.invoke("save-audio-clip", { data, mimeType })
})


